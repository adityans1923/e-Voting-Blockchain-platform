const express = require('express');
const router = express.Router();

const {FileSystemWallet, Gateway, X509WalletMixin} = require('fabric-network');
const path = require('path');
const ccpPath = path.resolve(__dirname, '..', '..', '..', 'blockchain-network', 'first-network', 'connection-org1.json');

/**
 *  @author : Ayush Jaiswal
 *  @Date : 21/02/2020
 */
router.post('/', async (req, res) => {

    try{

        const walletPath = path.join(process.cwd(), '../wallet');
        const wallet = new FileSystemWallet(walletPath);
        console.log(`************** Wallet path: ${walletPath} **************************`);

        const userExists = await wallet.exists(req.body.username);
        console.log(JSON.stringify(req.body.username));
        if (!userExists) {
            res.send('Voter not registered in Wallet');
            return;
        }

        const gateway = new Gateway();
        await gateway.connect(ccpPath, {
            wallet,
            identity: req.body.username,
            discovery: {enabled: true, asLocalhost: true}
        });

        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork('mychannel');

        // Get the contract from the network.
        const contract = network.getContract('contract');

        let voterDetail = await contract.evaluateTransaction('readMyAsset',req.body.username);
        voterDetail = JSON.parse(voterDetail.toString());

        console.log(voterDetail , "hello");

        let candidates = await contract.evaluateTransaction('getCandidateInConstituency',voterDetail.constituency);
        candidates = JSON.parse(candidates.toString());
        let candidateList = [];
        for(let i=0;i<candidates.length;i++){
            candidateList.push({
                username : candidates[i].Record.username,
                name : candidates[i].Record.firstName + " " + candidates[i].Record.lastName,
                partyName : candidates[i].Record.partyName
            });
        }

        console.log(candidateList);

        let response = {
            voterDetail : voterDetail,
            candidateList : candidateList
        };
        await res.json(response);

    }catch (error) {
        console.log("Error occurred while fetching voter from blockchain");
        console.log(error);
    }
});

module.exports = router;
