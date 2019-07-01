'use strict';

function printReceipt(inputs) {
  var productArray = findProductArray(inputs)

  var receiptSum = receiptSumm(productArray)

  console.log(getReceiptSummaryString(receiptSum));
}


function getReceiptSummaryString(receiptSum) {
  return '***<没钱赚商店>收据***\n' +
    getReceiptDetailString(receiptSum) +
    '----------------------\n'+
    '总计：' + toTwoDecimal(receiptSum.price) + '(元)\n'+
    '**********************';
}

function getReceiptDetailString(receiptSum) {
  var result = '';
  receiptSum.productList.forEach(r => {
    const sum = r.price * r.size;
    result = result + '名称：' + r.name + '，数量：' + r.size + r.unit + '，单价：' + toTwoDecimal(r.price) + '(元)，小计：' + toTwoDecimal(sum) + '(元)\n';
  });
  return result;
}

function toTwoDecimal(sum) {
  return sum.toFixed(2);
}

function receiptSumm(productArray) {
  var sumMap = mapArrayToSumMap(productArray)

  return mapSumMapToReceiptSummary(sumMap)
}

function mapSumMapToReceiptSummary(map) {
  var receiptSum = {
    name: 'Receipts',
    productList: [],
    price: 0
  };

  map.forEach(function (value, key, map) {
    var receipt = {
      name: value[0].name,
      price: value[0].price,
      size: value.length,
      unit: value[0].unit
    }
    
    receiptSum.productList.push(receipt);
    receiptSum.price = receiptSum.price + receipt.price * receipt.size;
  })

  return receiptSum;
}

function mapArrayToSumMap(productArray) {
  var groupMap = new Map();
  productArray.forEach(element => {
    if (groupMap.has(element.barcode)) {
      groupMap.get(element.barcode).push(element)
    } else {
      groupMap.set(element.barcode, [element]);
    }
  });

  return groupMap;
}

function findProductArray(ids) {
  var list = loadAllItems();

  var result = [];
  ids.forEach(id => {
    const product = findProduct(list, id);
    if (product != null) {
      result.push(product);
    }
  });

  return result;
}

function findProduct(list, id) {
  for (let index = 0; index < list.length; index++) {
    if (list[index].barcode == id) {
      return list[index];
    }
  }
  return null;
}