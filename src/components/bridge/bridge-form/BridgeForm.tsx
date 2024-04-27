import { useTranslations } from 'next-intl';
import './bridge-form.scss';
import '@/app/styles/box.scss';
import '@/app/styles/buttons.scss';
import Image from 'next/image';
import ethereumImg from '@/assets/images/chain/ethereum.png';

export const BridgeForm = (): JSX.Element => {
  const t = useTranslations('bridge');

  return (
    <div className="container--form">
      <div className="form--bridge">
        <div className="row--title">
          <span className="text--title"> {t('bridge')}</span>
        </div>
        <div className="box--input-field">
          <div className="box__space-between">
            <span> {t('from')}</span>
            <div>
              <span className="text--to--balance">Balance: 0 ETH</span>
            </div>
          </div>
          <div className="box__row">
            <Image width="24" height="24" src={ethereumImg} alt="chain-icon" />
            <div className="column--chain">
              <div>
                <span className="text--chain">Sepolia</span>
              </div>
            </div>
          </div>
        </div>
        <div className="row--reverse-btn">
          <div>
            <button className="material-symbols-outlined btn--reverse">autorenew</button>
          </div>
        </div>
        <div className="box--input-field">
          <div className="box__space-between">
            <span> {t('to')}</span>
            <div>
              <span className="text--to--balance">Balance: 0 ETH</span>
            </div>
          </div>
          <div className="box__row">
            <Image width="24" height="24" src={ethereumImg} alt="chain-icon" />
            <div className="column--chain">
              <div>
                <span className="text--chain">zKyoto</span>
              </div>
            </div>
          </div>
        </div>

        <div className="box--input-field box--hover--active">
          <div className="box__space-between">
            <div />
            <div className="box__available">
              <span className="text--to--balance">Balance: 0 ETH</span>
            </div>
          </div>
          <div className="box__row">
            <div className="box__row cursor-pointer">
              <div className="token-logo">
                <Image width="24" height="24" src={ethereumImg} alt="chain-icon" />
              </div>
              <span className="text--chain">ETH</span>
              <div className="icon--expand">
                <span className="material-symbols-outlined ">expand_more</span>
              </div>
            </div>
            <div className="box__column--input-amount">
              <input
                // :value="bridgeAmt"
                // inputmode="decimal"
                type="number"
                min="0"
                pattern="^[0-9]*(\.)?[0-9]*$"
                placeholder="0"
                className="input--amount input--no-spin"
                // @input="(e) => inputHandler(e)"
              />
            </div>
          </div>
        </div>
        <div className="row--buttons">
          <button
            className="btn--disabled button--confirm"
            // :disabled="isApproved || isDisabledBridge || isHandling || isLoading"
            // @click="approve"
          >
            {t('approve')}
          </button>
          <button
            className="btn--action button--confirm"
            // :disabled="!isApproved || isDisabledBridge || isHandling || isLoading"
            // @click="bridge"
          >
            {t('bridge')}
          </button>
        </div>
      </div>
    </div>
  );
};
