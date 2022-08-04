use anchor_lang::prelude::*;

#[account]
#[derive(Default)]
pub struct UserProfile {
    pub authority: Pubkey,
    pub last_todo: u8,
    pub todo_count: u8
}

#[account]
#[derive(Default)]
pub struct TodoAccount {
    pub authority: Pubkey,
    pub idx: u8,
    pub content: String,
    pub marked: bool,
}
