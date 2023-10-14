import React,{useContext, useRef, useState,useEffect} from 'react'
import { PaperPlaneRight, ImageSquare, XCircle } from "@phosphor-icons/react";
import { ChatContext } from '../context/ChatContext';

const MessageInput = ({chat}) => {
  const [message,setMessage] = useState('')
  const [messageType,setMessageType] = useState('text')
  const [images,setImages] = useState([])

  const formRef = useRef()

  const {messageLoading,sendMessage} = useContext(ChatContext)

  const send = async(e)=>{
    e.preventDefault()
    
    await sendMessage({
      sender: chat.members[0]._id,
      receiver: chat.members[1]._id,
      message,
      files: images,
      type: messageType
    })
    
    setMessage('')
    setImages([])
  }

  const handleImageShow = (e)=>{

    let j=1000
    for(let i=0;i<e.target.files.length;i++){
      const reader = new FileReader();
      reader.onload = () => {
        setImages((prevImages) => [...prevImages, {id: i.toString()+reader.result+j.toString(),src: reader.result}]);
      };
      reader.readAsDataURL(e.target.files[i]);
      j+=1
    }
  }

  useEffect(()=>{
    console.log(images)
  },[images])

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      if(message.length > 0){
        send(e)
      }
      e.preventDefault();
    }
  };

  const deleteShowImages = (id)=>{
    setImages(images.filter(image=>image.id !== id))
  }

  return (
    <div className="w-full p-4">
      <form
        className="w-full border border-gray-300 px-4 py-2.5 rounded-xl items-center justify-center"
        onSubmit={send}
        ref={formRef}
      >
        {images.length > 0 && (
          <div className="w-full flex items-center gap-4 mb-4">
            {images.map((image) => {
              return (
                <div key={image.id} className="w-12 relative">
                  <img
                    src={image.src}
                    alt="image"
                    className="w-full rounded-lg object-cover"
                  />
                  <button
                    className="absolute top-0 right-0"
                    onClick={() => deleteShowImages(image.id)}
                  >
                    <XCircle size={16} color="text-gray-800" />
                  </button>
                </div>
              );
            })}

            <div className="p-3 bg-gray-100 rounded-lg">
              <label
                htmlFor="send_images"
                className="text-gray-500 hover:cursor-pointer"
                onClick={() => setMessageType("image")}
              >
                <ImageSquare size={27} weight="regular" />
              </label>
              <input
                type="file"
                id="send_images"
                className="hidden"
                accept="image/*"
                onChange={handleImageShow}
                multiple
              />
            </div>
          </div>
        )}

        <div className="flex w-full items-center">
          <textarea
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            rows={1}
            className="outline-0 resize-none w-full"
            placeholder="Your message..."
          />
          {message.length > 0 || images.length > 0 ? (
            <button
              type="submit"
              className="rounded-full hover:scale-110 active:scale-90 text-primary duration-300 ease-in-out"
              disabled={messageLoading}
            >
              <PaperPlaneRight size={22} weight="fill" />
            </button>
          ) : (
            <div className="flex items-center gap-4">
              {/* sending images */}
              <div>
                <label
                  htmlFor="send_images"
                  className="text-gray-500"
                  onClick={() => setMessageType("image")}
                >
                  <ImageSquare size={27} weight="regular" />
                </label>
                <input
                  type="file"
                  id="send_images"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageShow}
                  multiple
                />
              </div>
            </div>
          )}
        </div>
      </form>
    </div>
  );
}

export default MessageInput
