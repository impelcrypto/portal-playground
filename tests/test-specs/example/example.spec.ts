import {
  type BrowserContext,
  test as baseTest,
  expect,
} from "@playwright/test";
import dappwright, {
  type Dappwright,
  MetaMaskWallet,
} from "@tenkeylabs/dappwright";
import { TEST_ACCOUNT_SEED } from "../../constants";

const test = baseTest.extend<{
  context: BrowserContext;
  wallet: Dappwright;
}>({
  context: async ({ browser }, use) => {
    const [wallet, _, context] = await dappwright.bootstrap("", {
      wallet: "metamask",
      version: MetaMaskWallet.recommendedVersion,
      seed: TEST_ACCOUNT_SEED,
      headless: !!process.env.CI,
    });

    await wallet.switchNetwork("Sepolia");
    await use(context);
    await context.close();
  },

  wallet: async ({ context }, use) => {
    const metamask = await dappwright.getWallet("metamask", context);
    await use(metamask);
  },
});

test.beforeEach(async ({ page, context, wallet }) => {
  await page.goto("/");
  await page.getByTestId("rk-connect-button").click();
  await page.getByTestId("rk-wallet-option-io.metamask").click();
  await wallet.approve();
});

test("Check the connected wallet address", async ({ page }) => {
  const accountButton = page.getByTestId("rk-account-button");
  await accountButton.click();
  const shortenAddress = await page.textContent("#rk_profile_title");
  expect(shortenAddress).toBe("0xf2…6cac");
});
