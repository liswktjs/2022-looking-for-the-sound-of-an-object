import { showTotalChargeCoin } from '../utils/display';
import PurchaseComponent from './PurchaseComponent';
import RechargeMaterialComponent from './RechargeMaterialComponent';
import RefundComponent from './RefundComponent';

class CoffeeMachineComponent {
  constructor() {
    this.initDOM();
    this.rechargeComponent = new RechargeMaterialComponent();
    this.purchaseComponent = new PurchaseComponent();
    this.refundComponent = new RefundComponent();
    this.showPurchaseCoffeeComponent();
    this.bindEventListener();
  }

  initDOM() {
    this.$nav = document.querySelector('nav');
  }

  showPurchaseCoffeeComponent() {
    this.purchaseComponent.show();
    this.rechargeComponent.hide();
    this.purchaseComponent.showPurchasableDrinkQuantity();
    showTotalChargeCoin();
  }

  showRechargeMaterialComponent() {
    this.rechargeComponent.show();
    this.purchaseComponent.hide();
    this.rechargeComponent.showNowMaterialQuantity();
  }

  bindEventListener() {
    this.$nav.addEventListener('click', this.onNavButtonClick);
  }

  onNavButtonClick = e => {
    e.preventDefault();

    if (e.target.id === 'recharge-material-tab') {
      this.showRechargeMaterialComponent();
    }

    if (e.target.id === 'purchase-coffee-tab') {
      this.showPurchaseCoffeeComponent();
    }
  };
}

export default CoffeeMachineComponent;
