import { coinStore } from '../store/coinStore';
import Drink from '../store/Drink';
import { materialStore } from '../store/materialStore';
import { ERROR_MSG, MENU_NAME } from '../utils/constants';
import { showServeCoffee } from '../utils/showServeCoffee';
import { showSnackBar } from '../utils/showSnackBar';
import {
  validateCafeLatteMaterialQuantity,
  validateChargeCoinInput,
  validateCoffeeMaterialQuantity,
  validateMilkMaterialQuantity,
} from '../utils/validations';
import RechargeMaterialComponent from './RechargeMaterialComponent';

class CoffeeMachineComponent {
  constructor() {
    this.initDOM();
    this.rechargeComponent = new RechargeMaterialComponent();
    this.showPurchaseCoffeeComponent();
    this.bindEventListener();
    this.drink = new Drink();
  }

  initDOM() {
    this.$purchaseCoffee = document.querySelector('.purchase-drink');
    this.$rechargeMaterial = document.querySelector('.recharge-material');
    this.$nav = document.querySelector('nav');
    this.$rechargeTab = document.querySelector('#recharge-material-tab');
    this.$purchaseTab = document.querySelector('#purchase-coffee-tab');

    this.$purchaseDrinkButtonContainer = document.querySelector('.purchase-drink-container');
    this.$purchasableDrinkQuantity = document.querySelectorAll('.drink-quantity');
    this.$purchaseButtons = document.querySelectorAll('.purchase-button');

    this.$totalChargeCoinElement = document.querySelector('#total-charge-coin');
    this.$chargeCoinButton = document.querySelector('#charge-coin-submit');
  }

  showPurchasableDrinkQuantity() {
    const materials = materialStore.getMaterialStore();

    if (materials !== 0) {
      const purchaseDrinkQuantity = this.drink.getPurchasableDrinkQuantity();
      this.$purchasableDrinkQuantity.forEach((item, index) => {
        item.textContent = purchaseDrinkQuantity[index];
      });
    }
  }

  showPurchaseCoffeeComponent() {
    this.$purchaseCoffee.classList.remove('hide');
    this.$rechargeMaterial.classList.add('hide');

    this.$purchaseTab.classList.add('is-active');
    this.$rechargeTab.classList.remove('is-active');

    this.showPurchasableDrinkQuantity();
    this.showTotalChargeCoin();
  }

  showRechargeMaterialComponent() {
    this.$rechargeMaterial.classList.remove('hide');
    this.$purchaseCoffee.classList.add('hide');

    this.$rechargeTab.classList.add('is-active');
    this.$purchaseTab.classList.remove('is-active');

    this.rechargeComponent.showNowMaterialQuantity();
  }

  bindEventListener() {
    this.$nav.addEventListener('click', this.onNavButtonClick);
    this.$purchaseDrinkButtonContainer.addEventListener('click', this.onPurchaseDrinkButtonClick);
    this.$chargeCoinButton.addEventListener('click', this.onChargeCoinButtonClick);
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

  onPurchaseDrinkButtonClick = e => {
    e.preventDefault();

    if (e.target.id === 'purchase-espresso-button') {
      if (!validateCoffeeMaterialQuantity()) {
        showSnackBar(ERROR_MSG.SOLD_OUT_ESPRESSO);
        return;
      }
      if (coinStore.buyDrink(this.drink.getMenuPrice(MENU_NAME.ESPRESSO))) {
        materialStore.buyDrink(MENU_NAME.ESPRESSO);
        showServeCoffee('☕️');
        showSnackBar('에스프레소가 나왔습니다');
      }
    }
    if (e.target.id === 'purchase-americano-button') {
      if (!validateCoffeeMaterialQuantity()) {
        showSnackBar(ERROR_MSG.SOLD_OUT_AMERICANO);
        return;
      }
      if (coinStore.buyDrink(this.drink.getMenuPrice(MENU_NAME.AMERICANO))) {
        materialStore.buyDrink(MENU_NAME.AMERICANO);
        showServeCoffee('🥃');
        showSnackBar('아메리카노가 나왔습니다');
      }
    }
    if (e.target.id === 'purchase-cafe-latte-button') {
      if (!validateCafeLatteMaterialQuantity()) {
        showSnackBar(ERROR_MSG.SOLD_OUT_CAFE_LATTE);
        return;
      }
      if (coinStore.buyDrink(this.drink.getMenuPrice(MENU_NAME.CAFE_LATTE))) {
        materialStore.buyDrink(MENU_NAME.CAFE_LATTE);
        showServeCoffee('🧋');
        showSnackBar('카페라떼가 나왔습니다');
      }
    }
    if (e.target.id === 'purchase-milk-button') {
      if (!validateMilkMaterialQuantity()) {
        showSnackBar(ERROR_MSG.SOLD_OUT_MILK);
        return;
      }
      if (coinStore.buyDrink(this.drink.getMenuPrice(MENU_NAME.MILK))) {
        materialStore.buyDrink(MENU_NAME.MILK);
        showServeCoffee('🥛');
        showSnackBar('우유가 나왔습니다');
      }
    }
    this.showPurchasableDrinkQuantity();
    this.activePurchaseMenuButton();
    this.showTotalChargeCoin();
  };

  onChargeCoinButtonClick = e => {
    e.preventDefault();
    const $chargeCoinInput = document.querySelector('#charge-coin-input');
    const { valueAsNumber: chargeCoinInputValue } = $chargeCoinInput;
    $chargeCoinInput.value = '';

    if (!validateChargeCoinInput(chargeCoinInputValue)) {
      showSnackBar(ERROR_MSG.INVALID_CHARGE_COIN_INPUT);
      return;
    }
    coinStore.chargeCoins(chargeCoinInputValue);
    this.activePurchaseMenuButton();
    this.showTotalChargeCoin();
  };

  showTotalChargeCoin = () => {
    const totalCoin = coinStore.getCoinStore();
    this.$totalChargeCoinElement.textContent = totalCoin;
  };

  activePurchaseMenuButton = () => {
    const menuNames = this.drink.getPurchaseableDrinkName();
    this.$purchaseButtons.forEach(item => {
      item.classList.remove('is-active');
      if (menuNames.includes(item.dataset.menuName)) {
        item.classList.add('is-active');
      }
    });
  };
}

export default CoffeeMachineComponent;
