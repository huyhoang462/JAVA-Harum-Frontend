import { service } from '/src/app/service.js'; 

export const navToDetail = async (nav, userId, postId) => {
  console.log("id này: ", userId);
  if (userId) {
    const isReadRes = await isReadPost(userId, postId);
    if (!isReadRes) {
      const views = {
        userId: userId,
        postId: postId,
      };

      await service.setReadPost(views);
    }
  }
  nav(`/post-detail/${postId}`);
};
