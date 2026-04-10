const PASSWORD_REQUIREMENTS = [
  {
    label: "Debe tener al menos 10 caracteres",
    check: (pwd) => pwd.length >= 10,
    key: "minLengthError",
  },
  {
    label: "Debe contener al menos una mayúscula",
    check: (pwd) => /[A-Z]/.test(pwd),
    key: "uppercaseError",
  },
  {
    label: "Debe contener al menos una minúscula",
    check: (pwd) => /[a-z]/.test(pwd),
    key: "lowercaseError",
  },
  {
    label: "Debe contener al menos un número",
    check: (pwd) => /[0-9]/.test(pwd),
    key: "numberError",
  },
  {
    label: "Debe contener al menos un símbolo",
    check: (pwd) => /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/.test(pwd),
    key: "symbolError",
  },
];

export default PASSWORD_REQUIREMENTS;