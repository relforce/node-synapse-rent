export const messages = {
  please_connect: "Please connect your wallet to the Avalanche network to use Ape Universe.",
  please_connect_wallet: "Please connect your wallet.",
  try_mint_more: (value: string) =>
    `You're trying to mint more than the maximum payout available! The maximum mint payout is ${value} TIME.`,
  before_minting: "Before minting, enter a value.",
  existing_mint:
    "You have an existing mint. Minting will reset your vesting period and forfeit any pending claimable rewards. We recommend claiming rewards first or using a fresh wallet. Do you still wish to proceed?",
  before_stake: "Before staking, enter a value.",
  error_422: "Something error. Please double check input information.",
  error_401: "Unauthorized access. Please double check information.",
  error_else: "Something went wrong.",
  before_unstake: "Before un staking, enter a value.",
  tx_successfully_send:
    "Your request has been sent successfully. Please wait for the administrator to approve this node.",
  your_data_updated: "Your data was successfully updated",
  nothing_to_claim: "You have nothing to claim",
  something_wrong: "Something went wrong",
  switch_to_avalanche: "Switch to the Avalanche network?",
  switch_to_bsc: "Switch to the BSC network?",
  switch_to_polygon: "Switch to the Polygon network?",
  switch_to_fantom: "Switch to the Fantom network?",
  switch_to_mumbai: "Switch to the Mumbai network?",
  slippage_too_small: "Slippage too small",
  slippage_too_big: "Slippage too big",
  your_data_update_soon: "Your data will update soon",
  before_wrap: "Before wrapping, enter a value.",
  before_unwrap: "Before un wrapping, enter a value.",
};
