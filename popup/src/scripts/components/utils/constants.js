export const inThirtyMinutes = new Date(new Date().getTime() + 30 * 60 * 1000);
export const SET_NEW_BALANCE_IN_HOME = "SET_NEW_BALANCE_IN_HOME"


export const HomePath = "Home"
export const LoginPath = "Login"
export const SignupPath = "Signup"

// transactions path
export const SendFundsPath = "SendFunds"
export const SendTokensPath = "SendTokens"
export const AssociateTokenPath = "AssociateToken"


// initial password setup path
export const PasswordPath = "Password"

// initial signup paths
export const AddFirstAccountPath = "AddFirstAccount"

// header files paths
export const AddNewAccountPath = "AddNewAccount"
export const CreateNewAccountPath = "CreateNewAccount"
export const CreateTokenPath = "CreateToken"
export const AddTokenPath = "AddToken"
export const SignMessagePath = "SignMessage"
export const TopicDetailsPath = "TopicDetails"

// native tokens hbar tiny_hbar

export const HBAR = "hbar"
export const TINY_HBAR = "tiny hbar"

export const toTinyHbar = (amount) => parseInt(amount * 10**8) 
export const toHbar = (amount) => parseFloat(amount / 10**8) 