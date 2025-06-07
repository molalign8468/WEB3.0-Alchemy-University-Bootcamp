const { utils, providers, Wallet } = require("ethers");
const { ganacheProvider } = require("./config");

const provider = new providers.Web3Provider(ganacheProvider);

async function donate(privateKey, charities) {
  const oneEther = utils.parseEther("1.0");
  const wallet = new Wallet(privateKey, provider);
  for (let i = 0; i < charities.length; i++) {
    const charity = charities[i];
    await wallet.sendTransaction({
      value: oneEther,
      to: charity,
    });
  }
}

const charities = [
  "0xBfB25955691D8751727102A59aA49226C401F8D4",
  "0xd364d1F83827780821697C787A53674DC368eC73",
  "0x0df612209f74E8Aa37432c14F88cb8CD2980edb3",
];
donate("0xGguygdussc769879s8scbducg7dgcic", charities);
