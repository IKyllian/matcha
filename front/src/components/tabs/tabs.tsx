import { css } from "styled-system/css"
import { tabsStyle } from "./tabs.style"
import { useState } from "react"

type TabsProps = {
    tabsContent: string[],
    navIndex: number,
    handleClick: (index: number) => void
}
const Tabs = ({ tabsContent, navIndex, handleClick }: TabsProps) => {
    const slotsStyles = tabsStyle.raw()
    return (
        <div className={css(slotsStyles.tabsContainer)} >
            {
                tabsContent.map((elem, index) => (
                    <div key={index} className={css(slotsStyles.tab)} data-active={index === navIndex} onClick={() => handleClick(index)}>
                        {elem}
                    </div>
                ))
            }
        </div>
    )
}

export default Tabs