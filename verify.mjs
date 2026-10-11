import fs from "node:fs";
import assert from "node:assert/strict";
const x=JSON.parse(fs.readFileSync(new URL("./calculator-test-vectors.json",import.meta.url),"utf8"));
function calculate({method,inputs:a}) {
 switch(method) {
  case "margin": {const profit=a.sellingPrice-a.cost;return {profit,marginPct:100*profit/a.sellingPrice,markupPct:100*profit/a.cost};}
  case "markup": {const profit=a.cost*a.markupPct/100,sellingPrice=a.cost+profit;return {profit,sellingPrice,marginPct:100*profit/sellingPrice};}
  case "discount": {const saved=a.original*a.ratePct/100;return {saved,salePrice:a.original-saved};}
  case "vat": {const taxAmount=a.net*a.ratePct/100;return {taxAmount,totalWithTax:a.net+taxAmount};}
  case "breakeven": {const contributionPerUnit=a.pricePerUnit-a.variableCostPerUnit; if(contributionPerUnit<=0)throw Error("invalid input");const units=Math.ceil(a.fixedCost/contributionPerUnit);return {contributionPerUnit,units,revenue:units*a.pricePerUnit};}
  case "roi": {const gain=a.finalValue-a.investment;return {gain,roiPct:100*gain/a.investment,multiple:a.finalValue/a.investment};}
  default:throw Error("unsupported method");
 }
}
for(const test of x.cases){
 const got=calculate(test);
 for(const [key,value] of Object.entries(test.expected))assert.ok(Math.abs(got[key]-value)<1e-9,test.id+" "+key);
 console.log("PASS",test.id);
}
console.log("REFERENCE_VECTORS_PASS="+x.cases.length);
