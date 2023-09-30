# DaoFlix

### Context

Daoflix is an exciting endeavor designed to establish a Decentralized Autonomous Organization (DAO) tailored specifically for streaming services. Its ultimate goal is to become a direct web3 counterpart to well-known platforms such as Netflix and Disney+. The inspiration for this project sprouted from the myriad challenges currently faced by conventional online streaming organizations. I used the code from
[fevm-data-dao kit](https://github.com/filecoin-project/fevm-data-dao-kit) as my starter. The smart contract is deployed on calibration test network.

### Motivation

A while back, when netflix fired Henry Cavil, fans pleaded with Disney to cast him as Wolverine in upcomming marvel movies, this gave me an idea to create a platform to allow long time fans to take part in some of the decisions in the organisation. Thnaks to FEVM, even the movie itself can be stored on blockchain with much more compute actions.

### Why DaoFlix

Differences between daoflix and convensional streaming services

1. **Users are not beneficiaries of their own data:** Many conventional streaming platforms collect extensive user data, such as viewing habits and preferences, without offering any tangible benefits to their users in return. In contrast, DaoFlix aims to establish a fairer ecosystem where users have control over their data and can potentially earn rewards or incentives for sharing it within the DAO.

2. **Fan loyalty is seldom rewarded:** Existing streaming services often lack mechanisms to reward loyal fans and viewers who consistently engage with specific shows or content creators. Daoflix intends to address this by implementing smart contracts and token incentives, ensuring that dedicated fans receive recognition and rewards for their ongoing support. eg they get a token after watching a movie

3. **Content availability discrepancies across regions:** Current streaming platforms face challenges related to content licensing and regional restrictions, resulting in some shows or movies being unavailable in certain regions. Daoflix, as a decentralized solution, strives to mitigate this issue by enabling a more global and inclusive content distribution model, where access is not restricted by geographical boundaries. This approach enhances the overall user experience and eliminates frustrating content gaps.
4. **Services ignore long-time fans' requests, such as casting decisions:** Existing streaming platforms sometimes disregard the input and feedback of their dedicated, long-time fans. This is particularly evident when fans have strong opinions, such as casting choices for characters, which are overlooked. Daoflix strives to foster a more inclusive and participatory environment where fans' opinions are considered and have a genuine impact on content decisions, casting choices, and more.

5. **Movies that were rented online suddenly disappear:** Many users have experienced the frustrating situation where movies or content they've rented online suddenly vanish from their libraries due to licensing agreements or other reasons. Daoflix aims to offer greater transparency and consistency in content availability, ensuring that once users have access to a piece of content, they can enjoy it without unexpected interruptions or removals. This enhances the reliability and trustworthiness of the platform.

#### Token

The DaoFlix governace token is called DFT, the token starts in the conctract's tresurey and to own a token, you need to deposit 1TFil to aquire one token. The streaming service will be pay per view. THis ensures that you do not pay for movies you are never going to watch. A viewer get some DFTs when they watch a movie, this means that they can now take part in some of the decisions.

### Movie creation

To produce a movie, you first have to sell the idea, if the DAO likes it, you need to propose the budjet, propose the crew and the cast, then finally after production, you need to store the actuall movie on filecoin. We are using FEVM and lighthouse to propose a storage deals on

#### Ideation

Proposers propose a movie by providing the name as a string and movie plot in a text file, The DAO uses lighthouse SDK to upload the plot file in proposer's storage, and encrytpting the file such that only "DFT" holders can access it

##### Pre-Production

If the DAo likes the movie idea, the movie moves to pre production. Here, the DAO votes on proposals pertaining to budjets, crew, cast etc.

##### In production

The movie is created,

#### Post production

After the movie is created, the DAO votes on proposals pertaining storage deals, on where to store the movie

#### Token rewards

Movie viewers get rewarded on wwatching movies and for uploading usage data to the dao.

### Whats next.

* Add more flexible proposal functionality
* Create a separate Utility token for movie viewers.
