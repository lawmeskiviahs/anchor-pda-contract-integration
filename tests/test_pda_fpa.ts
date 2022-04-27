import * as anchor from "@project-serum/anchor";
// import { Program } from "@project-serum/anchor";
import { Myprogram } from "../target/types/myprogram";

describe("test_pda_fpa", () => {
  // Configure the client to use the local cluster.
  const program = anchor.workspace.test_pda_fpa as Program<Myprogram>;

  // const program = anchor.workspace;

  it("Is initialized!", async () => {
    // Add your test here.
    // const tx = await program.rpc.initialize({});
    // console.log("Your transaction signature", tx);
    const [baseAccountPDA, baseAccountPDABump] = await anchor.web3.PublicKey.findProgramAddress(
      [Buffer.from("seed")],
      program.programId
    );

    await program.rpc.initialize(baseAccountPDABump, {
      accounts: {
        baseAccount: baseAccountPDA,
        creator: program.provider.wallet.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId,
      },
      signers: [],
    });
  });

});
