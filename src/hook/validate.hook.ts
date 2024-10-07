export function useValidate() {
  const validateEmail = (email: string) => {
    return (
      String(email)
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        ) !== null
    );
  };

  const validatePassword = (password: string) => {
    return password.length >= 8;
  };

  const validateCode = (code: string) => {
    return code.length === 8;
  };

  return { validateEmail, validatePassword, validateCode };
}
