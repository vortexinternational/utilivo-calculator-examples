# Six calculator checks you can reproduce without a spreadsheet

A calculator result is easier to trust when you can reproduce it from its inputs. This worksheet shows six ordinary business calculations, the expected outputs, and the assumptions that can change the interpretation. It is intended for developers, educators, testers, and people checking their own figures.

The examples match the open, dependency-free test vectors in [calculator-test-vectors.json](../calculator-test-vectors.json). To run those independently, install Node.js 18 or newer, clone the repository, and execute `node verify.mjs`. That script checks mathematical reference cases; it does **not** test a live website's interface, security, PDF outputs, or localized tax rules.

## Worked examples

| Calculation | Inputs | Method | Expected result |
| --- | --- | --- | --- |
| Profit margin | Cost 80, selling price 100 | Profit = 100 − 80; margin = profit / selling price × 100 | Profit 20; margin **20%**; markup **25%** |
| Markup pricing | Cost 80, markup 25% | Selling price = 80 × (1 + 0.25) | Selling price **100**; profit 20; margin 20% |
| Discount | Original price 200, discount 15% | Savings = 200 × 0.15 | Savings **30**; sale price **170** |
| Example sales tax / VAT | Net amount 200, entered rate 15% | Tax = net × entered rate | Tax **30**; illustrative gross total **230** |
| Break-even units | Fixed cost 1,200; selling price 50; variable cost 20 per unit | Unit contribution = 50 − 20 = 30; units = ceiling(1,200 / 30) | **40 units**; revenue **2,000** |
| Return on investment | Initial investment 1,000; final value 1,250 | ROI = (1,250 − 1,000) / 1,000 × 100 | Gain **250**; ROI **25%**; multiple **1.25×** |

These amounts are examples, not prices, forecasts, or financial advice.

## Three common mistakes

### 1. Confusing margin and markup

For cost 80 and selling price 100, the profit of 20 is **20% of sales revenue** (margin), but **25% of cost** (markup). Both numbers are correct because the denominators are different. Do not set a 25% selling-price margin by merely marking cost up 25%.

### 2. Forgetting rounding and boundary conditions

A useful independent test suite should include more than the six happy-path values above. Check decimal fractions, zero denominators, extremely large inputs, negative values where meaningful, and differences between rounding intermediate values and rounding only the final result. A production calculator should clearly define what it accepts. Don't divide by a zero selling price, cost, or initial investment.

For break-even estimates, a nonpositive contribution per unit means there is no positive finite sales quantity that recovers fixed costs under this simple model. Ceiling to a whole unit only after division.

### 3. Treating illustrative rates as real rules

The VAT/sales-tax example uses a **user-supplied 15% rate** for arithmetic demonstration. Actual rates, exemptions, thresholds, invoices, and rounding may depend on jurisdiction, date, and transaction type. The ROI example similarly excludes fees, timing, taxes, and cash flows unless they are reflected explicitly in the inputs.

## A practical review checklist

1. Write down every input and its unit or currency.
2. Calculate the expected result by hand, with a spreadsheet, or from a second independent implementation.
3. Check that the right denominator and percentage convention were used.
4. Exercise one zero or invalid-input case and one decimal or rounding case.
5. Compare the tool's displayed labels and assumptions with your calculation.
6. Record discrepancies with exact inputs, expected outputs, observed outputs, and any rounding policy.

The six reproducible cases in this repository are published as CC0 reference material, so they can be reused in teaching or QA. Attribution is optional, and this dataset does not license the Utilivo brand or interface.

If you want to compare the reference arithmetic with browser-based tools, the relevant examples are available in the [Utilivo calculator collection](https://utilivo.tech/tools/calculators). This repository and its script remain independent reference calculations rather than claims of passing production UI tests.
