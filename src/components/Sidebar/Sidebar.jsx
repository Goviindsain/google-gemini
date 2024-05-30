import React, { useContext } from 'react'
import './Sidebar.css'
import { assets } from '../../assets/assets'
import { useState } from 'react'
import { Context } from '../../context/Context'

const Sidebar = () => {

    const [extend, setextend] = useState(false)
    const { onSent, prevPrompts, setrecentPrompt, newChat } = useContext(Context)

    const loadPro = async (prompt) => {
        setrecentPrompt(prompt)
        await onSent(prompt)
    }


    return (
        <div className='sidebar'>
            <div className="top">
                <img onClick={() => setextend(prev => !prev)} className='menu' src={assets.menu_icon} alt="" />
                <div onClick={()=>newChat()} className="newchat">
                    <img src={assets.plus_icon} alt="" />
                    {extend ? <p>New Chat</p> : null}
                </div>

                {extend ?
                    <div className="recent">
                        <p className="recent-title">
                            Recent
                        </p>
                        {prevPrompts.map((item, index) => {
                            return (
                                <div onClick={() => loadPro(item)} className="recent-entry">
                                    <img src={assets.message_icon} alt="" />
                                    <p>{item.slice(0, 18)} ...</p>
                                </div>
                            )
                        })}

                    </div>
                    : null}
            </div>


            <div className="bottom">
                <div className="bottom-item recent-entry">
                    <img src={assets.question_icon} alt="" />
                    {extend ? <p>Help</p> : null}
                </div>
                <div className="bottom-item recent-entry">
                    <img src={assets.history_icon} alt="" />
                    {extend ? <p>Activity</p> : null}
                </div>
                <div className="bottom-item recent-entry">
                    <img src={assets.setting_icon} alt="" />
                    {extend ? <p>Settings</p> : null}
                </div>
            </div>
        </div>
    )
}

export default Sidebar
