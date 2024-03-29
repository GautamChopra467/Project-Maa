import React, { useState , useEffect} from "react";
import "../components/css/ChatForumStyles.css";
import { AiFillMessage, AiFillSetting } from "react-icons/ai";
import { BsBarChartFill, BsClock, BsCalendarDateFill, BsMegaphoneFill, BsFillQuestionCircleFill, BsSliders, BsThreeDots, BsTable, BsEmojiSmile } from "react-icons/bs";
import { FaBars, FaBell, FaReact } from "react-icons/fa";
import { TbBrandMeta, TbMessageDots } from "react-icons/tb";
import { HiHome } from "react-icons/hi";
import { IoDocuments, IoSearchOutline, IoSend } from "react-icons/io5";
import { MdFeedback } from "react-icons/md";
import { BiCheck } from "react-icons/bi";
import { IoMdThumbsUp } from "react-icons/io";
import { ImAttachment } from "react-icons/im";
import Logo from "../img/logo.png";
import { Link , useParams , useNavigate} from "react-router-dom";
import ParentComment from "../components/jsx/ParentComment";
import io from  "socket.io-client";
import axios from "axios" ;
import {useCookies} from 'react-cookie';
const socket = io.connect("http://localhost:5000") ;

const ChatForum = () => {
    const [myself, setMyself] = useState(true);

    const navigate = useNavigate() ;

    const [message , setMessage] = useState("") ;
  
    const [cookies,setCookie,removeCookie] = useCookies([]);
  
    const [messageReceived , setMessageReceived] = useState([]) ;
  
    const [error , setError] = useState("") ;
  
    const [userInfo,setUserInfo] = useState({});

    const {id} = useParams();

    const sendMessage = () =>{
      if(message.length == 0){
        setError("Please type the message.") ;
      }
      else{
        socket.emit("send_message",{ message , from : id , name :userInfo.name }) ;
      }
      setMessage("") ;
    }

    const getChatForum = ()=>{
      axios.get(`http://localhost:5000/user/chatforum`).then(({data})=>{
        setMessageReceived(data);
      })
    }

    const getUser = async()=>{
      axios.get(`http://localhost:5000/user/getuser/${id}`).then(({data})=>{
        setUserInfo(data);
      })
    }
    
  useEffect(() =>{

    const verifyUser = ()=>{
      if(!cookies.jwt){
        console.log("In Login") ;
        navigate('/login');
      }else{
        axios.post(`http://localhost:5000/user/checkuser`,{},{
          withCredentials:true,
        }).then(({data})=>{
          if(data.id != id){
            console.log("In Login 2") ;
            removeCookie("jwt");
            navigate('/login');
          }else{
            if(data.flag){
              navigate(`/${data.id}/chatforum`);
              getUser();
              getChatForum() ;
            } 
          }
        })
      }
    }
  
    verifyUser() ;

    socket.on("receive_message",(data) =>{
      console.log(data)  ;
      setMessageReceived(data) ;
      getChatForum() ;
    })
  },[socket])

  return (
    <div>
      <div className="main_container_message">
        <div className="first_section_message">
            <Link to="/">
                <img src={Logo} alt="logo" />
            </Link> 
          {/* <TbBrandMeta className="meta_icon_message" /> */}
          <div className="logo_container_message">D</div>
          <div className="sidebar_icons_container_message">
            <HiHome className="sidebar_icon_message" />
            <FaBell className="sidebar_icon_message" />
            <AiFillMessage className="sidebar_icon_message" />
            <BsCalendarDateFill className="sidebar_icon_message" />
            <BsMegaphoneFill className="sidebar_icon_message" />
            <BsBarChartFill className="sidebar_icon_message" />
            <FaBars className="sidebar_icon_message" />
            <IoDocuments className="sidebar_icon_message" />
          </div>
          <div className="sidebar_bottom_icons_container_message">
            <BsFillQuestionCircleFill className="sidebar_icon_message" />
            <MdFeedback className="sidebar_icon_message" />
          </div>
        </div>

        <div className="second_section_message">
          <div className="second_top_section_message">
            <div className="second_top_left_section_message">
              <h3>Chat Forum</h3>
            </div>

            <div className="second_top_right_section_message">
              <button className="btn_primary_message">
                <BsClock className="clock_icon_message" />
                <p>Available</p>
              </button>

              <button className="btn_primary_message">
                <FaReact className="react_icon_message" />
                <p>Automations</p>
              </button>

              <button className="btn2_primary_message">
                <AiFillSetting className="settings_icon_message" />
              </button>
            </div>
          </div>

          <div className="chat_container_message">

            <div className="chat_main_box_message">

              {/* CHAT WINDOW */}
              {/* {SenderProfile.forEach((element) => {
                if (element.conversation_id === conversationId) {
                  selectedConversation = element;
                  ps_id = element.id;
                }
              })} */}

              {/* {selectedConversation && ( */}
                <div className="chat_window_container_message">

                  <div className="message_section_message">
                    <div className="message_top_section_message">
                      {/* <p>1:50 AM</p> */}
                    </div>

                      {
                        messageReceived.map((messages , index)=>(
                            <div className="message_middle_section_message" key={index}>
                              {(messages.from == id) ? <ParentComment myself="true" msg={messages}/> :  <ParentComment myself="false" msg={messages} />}
                            </div>
                        ))
                      }
                        

                    <div className="message_bottom_section_message">
                      <div className="input_container_message">
                        <div className="input_top_section">
                          <input
                             onChange={(e) => setMessage(e.target.value)}
                            // value={inputMessage}
                            type="text"
                            placeholder="Reply in Messenger..."
                          />
                          <IoSend
                            onClick={sendMessage}
                            className="send_icon_message"
                          />
                        </div>

                        <div className="input_bottom_section">
                          <div className="input_bottom_icon_container_message">
                            <ImAttachment className="attach_icon_message" />
                          </div>
                          <div className="input_bottom_icon_container_message">
                            <TbMessageDots className="attach_icon_message" />
                          </div>
                          <div className="input_bottom_icon_container_message">
                            <BsEmojiSmile className="attach_icon_message" />
                          </div>
                          <div className="input_bottom_icon_container_message">
                            <BsTable className="attach_icon_message" />
                          </div>
                          <div className="input_bottom_icon_container_message">
                            <IoMdThumbsUp className="attach_icon_message" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              {/* )} */}
            </div>
          </div>
        </div>

        <div className="third_section_message">
          <div className="third_section_box_message"></div>
        </div>
      </div>
    </div>
  );
};

export default ChatForum;
