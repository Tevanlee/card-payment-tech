export const onlyDigits = (value) => value.replace(/\D/g, "");

export const formatCardHolder = (value) => {
  return value.replace(/[^a-zA-Z\s]/g, "").slice(0, 26);
};

export const formatCardNumber = (value) => {
  const digits = onlyDigits(value).slice(0, 19);
  return digits.replace(/(\d{4})(?=\d)/g, "$1 ");
};

export const formatExpiry = (value) => {
  const digits = onlyDigits(value).slice(0, 4);
  if (!digits) return "";

  let month = digits.slice(0, 2);
  let year = digits.slice(2);

  if (month.length === 1 && parseInt(month, 10) > 1) {
    month = "0" + month;
  }

  if (month.length === 2) {
    let m = parseInt(month, 10);
    if (m === 0) m = 1;
    if (m > 12) m = 12;
    month = m.toString().padStart(2, "0");
  }

  if (year.length === 2) {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear() % 100;
    const currentMonth = currentDate.getMonth() + 1;

    let y = parseInt(year, 10);
    if (y < currentYear) {
      y = currentYear;
      year = y.toString().padStart(2, "0");
      month = currentMonth.toString().padStart(2, "0");
    } else if (y === currentYear) {
      const m = parseInt(month, 10);
      if (m < currentMonth) month = currentMonth.toString().padStart(2, "0");
    }
  }

  return year ? `${month}/${year}` : month;
};

export const formatCVV = (value) => {
  return onlyDigits(value).slice(0, 4);
};
