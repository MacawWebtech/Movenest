/**
 * MOVENEST — calculator.js
 * Demo pricing logic only. Numbers are illustrative and clearly labelled
 * as an indicative estimate everywhere they appear — see pricing.html.
 */

(() => {
  "use strict";

  const HOME_SIZE_BASE = {
    studio: 6500,
    "1bhk": 9500,
    "2bhk": 14000,
    "3bhk": 19500,
    "4bhk": 26000,
  };

  const DISTANCE_TIERS = [
    { max: 15, rate: 1.0, label: "within the city" },
    { max: 150, rate: 1.6, label: "nearby city" },
    { max: 600, rate: 2.4, label: "regional" },
    { max: Infinity, rate: 3.3, label: "intercity" },
  ];

  // Rough illustrative city-pair distances (km) for the demo estimator.
  const CITY_DISTANCE = {
    "chennai|chennai": 10, "bengaluru|bengaluru": 10, "mumbai|mumbai": 10,
    "chennai|bengaluru": 350, "bengaluru|chennai": 350,
    "chennai|hyderabad": 630, "hyderabad|chennai": 630,
    "chennai|mumbai": 1330, "mumbai|chennai": 1330,
    "mumbai|pune": 150, "pune|mumbai": 150,
    "mumbai|delhi": 1400, "delhi|mumbai": 1400,
    "bengaluru|hyderabad": 570, "hyderabad|bengaluru": 570,
    "chennai|coimbatore": 500, "coimbatore|chennai": 500,
    "chennai|kochi": 690, "kochi|chennai": 690,
    "delhi|bengaluru": 2150, "bengaluru|delhi": 2150,
  };

  function estimateDistance(from, to) {
    const key = `${(from || "").trim().toLowerCase()}|${(to || "").trim().toLowerCase()}`;
    if (CITY_DISTANCE[key] !== undefined) return CITY_DISTANCE[key];
    if (key.split("|")[0] === key.split("|")[1] && from) return 12;
    return 420; // reasonable default for an unlisted city pair
  }

  function distanceRate(km) {
    const tier = DISTANCE_TIERS.find((t) => km <= t.max);
    return tier.rate;
  }

  /**
   * Compute a demo cost breakdown.
   * @param {Object} input
   * @param {string} input.from
   * @param {string} input.to
   * @param {string} input.homeSize - one of HOME_SIZE_BASE keys
   * @param {Object} [input.services] - { packing, unpacking, dismantling, fragile, storage }
   * @param {boolean} [input.liftAvailable]
   */
  function computeEstimate(input) {
    const base = HOME_SIZE_BASE[input.homeSize] || HOME_SIZE_BASE["1bhk"];
    const km = estimateDistance(input.from, input.to);
    const rate = distanceRate(km);
    const distanceCharge = Math.round((km * 6) * rate) / 1 || 0;
    const homeSizeCharge = Math.round(base * 0.55);

    const services = input.services || {};
    const packingCharge = services.packing ? Math.round(base * 0.32) : 0;
    const unpackingCharge = services.unpacking ? Math.round(base * 0.14) : 0;
    const dismantlingCharge = services.dismantling ? 1800 : 0;
    const fragileCharge = services.fragile ? 1500 : 0;
    const storageCharge = services.storage ? 2200 : 0;
    const liftSurcharge = input.liftAvailable === false ? Math.round(base * 0.08) : 0;

    const handlingCharge = 1500 + liftSurcharge;
    const additionalServices = dismantlingCharge + fragileCharge + storageCharge;

    const subtotal =
      base + distanceCharge + homeSizeCharge + packingCharge + unpackingCharge +
      handlingCharge + additionalServices;

    const tax = Math.round(subtotal * 0.18);
    const total = subtotal + tax;
    const rangeLow = Math.round((total * 0.92) / 100) * 100;
    const rangeHigh = Math.round((total * 1.1) / 100) * 100;

    return {
      km, rate, base, distanceCharge, homeSizeCharge, packingCharge,
      unpackingCharge, handlingCharge, additionalServices, subtotal, tax, total,
      rangeLow, rangeHigh,
    };
  }

  function formatINR(n) {
    return "₹" + Math.round(n).toLocaleString("en-IN");
  }

  window.MoveNestCalculator = { computeEstimate, formatINR, estimateDistance };
})();
