// pricing.js

// --- Pricing Data ---
let basePricePerPerson = 0;
let selectedPackageDays = 0;
let hotelTypes = {};
let roomTypes = {};
let vehiclePrices = {};

// --- Helpers ---
function getTotalPeople() {
  const adults = parseInt(document.getElementById("adults")?.value || 0);
  const children = parseInt(document.getElementById("children")?.value || 0);
  return adults + children;
}

// --- Recalculation Function ---
function recalc() {
  const adults = parseInt(document.getElementById("adults")?.value || 0);
  const children = parseInt(document.getElementById("children")?.value || 0);
  const hotel = document.getElementById("hotel")?.value || "none";
  const room = document.getElementById("rooms")?.value || "none";
  const vehicle = document.getElementById("vehicle")?.value || "none";

  let total = 0;

  // Base Package Price
  total += basePricePerPerson * (adults + children);

  // Hotel Cost
  if (hotel !== "none" && hotelTypes[hotel]) {
    total += hotelTypes[hotel] * selectedPackageDays * getTotalPeople();
  }

  // Room Cost
  if (room !== "none" && roomTypes[room]) {
    total += roomTypes[room] * selectedPackageDays;
  }

  // Vehicle Cost
  if (vehicle !== "none" && vehiclePrices[vehicle]) {
    total += vehiclePrices[vehicle] * selectedPackageDays;
  }

  // ✅ Update summary if it exists
  if (document.getElementById("summaryPrice")) {
    document.getElementById("summaryPrice").textContent = `$${total}`;
  }

  return total;
}
