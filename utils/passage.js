import Passage from '@passageidentity/passage-node';

const appID = process.env.PASSAGE_APP_ID;
  const passage = new Passage({
    appID: process.env.NEXT_PUBLIC_PASSAGE_APP_ID,
    apiKey: process.env.PASSAGE_API_KEY,
  });

export const getAuthenticatedUserFromSession = async (req, res) => {
    try {
        const userID = await passage.authenticateRequest(req);
        if (userID) {
          return {isAuthorized: true, userID: userID };
        }
      } catch (error) {
        // authentication failed
        return {isAuthorized: false, userID: "" };
      }
  }