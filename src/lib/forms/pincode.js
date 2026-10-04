// Indian PIN code -> state / union territory, from the first digits of the PIN.
// Postal circles mostly follow state borders, so this is approximate near
// borders; it is used to group "notify me" demand by state for KMF's report.

const THREE = {
  // Exceptions inside a two-digit range, by first three digits.
  160: 'Chandigarh', 403: 'Goa', 605: 'Puducherry', 609: 'Puducherry', 673: 'Puducherry (Mahe)', 737: 'Sikkim', 744: 'Andaman & Nicobar Islands',
  396: 'Dadra & Nagar Haveli and Daman & Diu',
  790: 'Arunachal Pradesh', 791: 'Arunachal Pradesh', 792: 'Arunachal Pradesh', 793: 'Meghalaya', 794: 'Meghalaya', 795: 'Manipur', 796: 'Mizoram', 797: 'Nagaland', 798: 'Nagaland', 799: 'Tripura',
  244: 'Uttarakhand', 246: 'Uttarakhand', 247: 'Uttarakhand', 248: 'Uttarakhand', 249: 'Uttarakhand', 262: 'Uttarakhand', 263: 'Uttarakhand',
  181: 'Jammu & Kashmir', 182: 'Jammu & Kashmir', 184: 'Jammu & Kashmir', 185: 'Jammu & Kashmir', 190: 'Jammu & Kashmir', 191: 'Jammu & Kashmir', 192: 'Jammu & Kashmir', 193: 'Jammu & Kashmir', 194: 'Ladakh',
  814: 'Jharkhand', 815: 'Jharkhand', 816: 'Jharkhand', 822: 'Jharkhand', 823: 'Jharkhand', 825: 'Jharkhand', 826: 'Jharkhand', 827: 'Jharkhand', 828: 'Jharkhand', 829: 'Jharkhand', 831: 'Jharkhand', 832: 'Jharkhand', 833: 'Jharkhand', 834: 'Jharkhand', 835: 'Jharkhand',
};

const TWO = [
  [11, 11, 'Delhi'], [12, 13, 'Haryana'], [14, 16, 'Punjab'], [17, 17, 'Himachal Pradesh'], [18, 19, 'Jammu & Kashmir'],
  [20, 28, 'Uttar Pradesh'], [30, 34, 'Rajasthan'], [36, 39, 'Gujarat'], [40, 44, 'Maharashtra'], [45, 48, 'Madhya Pradesh'], [49, 49, 'Chhattisgarh'],
  [50, 50, 'Telangana'], [51, 53, 'Andhra Pradesh'], [56, 59, 'Karnataka'], [60, 64, 'Tamil Nadu'], [67, 69, 'Kerala'],
  [70, 74, 'West Bengal'], [75, 77, 'Odisha'], [78, 78, 'Assam'], [79, 79, 'North-East'], [80, 85, 'Bihar'],
];

export const PIN_RE = /^[1-9]\d{5}$/;

export function stateFromPin(pin) {
  const p = String(pin || '').trim();
  if (!PIN_RE.test(p)) return null;
  const three = Number(p.slice(0, 3));
  if (THREE[three]) return THREE[three];
  const two = Number(p.slice(0, 2));
  const hit = TWO.find(([a, b]) => two >= a && two <= b);
  return hit ? hit[2] : 'Unknown';
}

export const isKarnatakaPin = (pin) => stateFromPin(pin) === 'Karnataka';
