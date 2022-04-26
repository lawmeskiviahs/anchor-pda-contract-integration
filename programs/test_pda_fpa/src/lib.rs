use anchor_lang::prelude::*;
use solana_program::system_program;
use solana_program::entrypoint::ProgramResult;
declare_id!("7ZGin1cH6HnZM19J9ovXXn3FyaheRQoAK83okRzqyiXf");

#[program]
pub mod myprogram {
    use super::*;

 pub fn initialize(ctx: Context<Initialize>, bump:u8) -> ProgramResult {
        let base_account: &mut Account<BaseAccount> = &mut ctx.accounts.base_account;
        base_account.bump = bump;
        base_account.counter = Some(0);
        return Ok(());
    }
}



#[derive(Accounts)]
#[instruction(bump:u8)]
pub struct Initialize<'info> {
    #[account(
        seeds = [b"seed".as_ref()], 
        bump, init, payer = creator, space = 20000)]
    pub base_account: Account<'info, BaseAccount>,
    #[account(mut)]
    pub creator: Signer<'info>,
    #[account(address = system_program::ID)]
    /// CHECK xyz
    pub system_program: AccountInfo<'info>,
}

#[account]
#[derive(Default)]
pub struct BaseAccount {
    pub counter: Option<u64>,
    pub bump: u8,
}