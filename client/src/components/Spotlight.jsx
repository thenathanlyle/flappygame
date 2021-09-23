import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import Form from "./Form";
import axios from "axios";
import MatchOfTheWeek from "./MatchOfTheWeek";

const airtableBase = process.env.REACT_APP_AIRTABLE_BASE;
const airtableKey = process.env.REACT_APP_AIRTABLE_KEY;
const URLForm = `https://api.airtable.com/v0/${airtableBase}/Opinions`;

const config = {
  headers: {
    Authorization: `Bearer ${airtableKey}`,
  },
};

export default function Spotlight() {
  const [username, setUsername] = useState("");
  const [comment, setComment] = useState("");
  const [returnComment, setReturnComment] = useState("");

  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fields = {
      username,
      comment,
    };
    await axios.post(URLForm, { fields }, config);
    history.push(`/Spotlight`);
    window.location.reload();
  };

  useEffect(() => {
    const fetchComments = async () => {
      const res = await axios.get(URLForm, config);
      setReturnComment(res.data.records);
      return res.data.records;
    };
    fetchComments();
  }, []);

  return (
    <div>
      <MatchOfTheWeek />
      <h3>Comment Section</h3>
      <Form
        username={username}
        setUsername={setUsername}
        comment={comment}
        setComment={setComment}
        handleSubmit={handleSubmit}
        type={"Submit"}
      />
      {returnComment ? (
        <div>
          <div className="User">
            {returnComment.map((Opinions) => {
              return <h3>{Opinions.fields.username}</h3>;
            })}
          </div>
          <div className="CommentPost">
            {returnComment.map((Opinions) => {
              return <p>{Opinions.fields.comment}</p>;
            })}
          </div>
        </div>
      ) : null}
    </div>
  );
}
