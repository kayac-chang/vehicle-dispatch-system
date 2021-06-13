const moreThenEight = `(?=.{8,})`;
const hasNumber = `(?=.*\\d)`;
const hasLowerCase = `(?=.*[a-z])`;
const hasUpperCase = `(?=.*[A-Z])`;
const hasSpecialCharacter = `(?=.*[!*$%])`;

const Password = RegExp(
  `${moreThenEight}(
	  ${hasNumber}${hasLowerCase}${hasUpperCase}|
	  ${hasNumber}${hasLowerCase}${hasSpecialCharacter}|
	  ${hasLowerCase}${hasUpperCase}${hasSpecialCharacter}
  ).*`.replace(/\s/g, "")
);

const Phone = RegExp(/^09\d{8}$/);

const Rule = { Password, Phone };
export default Rule;
