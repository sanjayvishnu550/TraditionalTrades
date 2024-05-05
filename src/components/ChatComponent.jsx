import React from 'react'
import Nav from '../components/chat/nav/Nav'
import ChatBody from '../components/chat/chatBody/ChatBody'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
const ChatComponent = ({handleModal}) => {
  
  return (
    <>
      <div className="">
        <div className="fixed inset-0 w-full h-full bg-black opacity-80 flex items-center">
          <div className="bg-black absolute right-5">
            <div
              className="w-5 h-5  absolute right-10 top-10"
              onClick={handleModal}
            >
              <FontAwesomeIcon className='w-5 h-5' icon={faXmark} />
            </div>
            <Nav />
            <ChatBody />
          </div>
        </div>
      </div>
    </>
  );
}

export default ChatComponent