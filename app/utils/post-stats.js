import { statsByPostId } from "./playerFilters";
import Likes from "../data/post-stats/likes";
import Comments from "../data/post-stats/comments";
import Views from "../data/post-stats/views"

const Stats = {
  likesByPost: statsByPostId(Likes),
  commentsByPost: statsByPostId(Comments),
  viewsByPost: statsByPostId(Views)
}

export default Stats;