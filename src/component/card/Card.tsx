import { ReactNode, useEffect, useRef } from "react"
import style from './Card.module.scss'

type CardType = {
    children? : ReactNode
}

const Card = ({
    children,
} : CardType) => {

    const cardRef = useRef<HTMLDivElement>(null)

    return (
        <div className={style.card}
            ref={cardRef}>
            <div className={style.card_content}>
                {children}
            </div>
        </div>
    )
}

type CardContainerType = {
    children? : ReactNode
}

export const CardContainer = ({
    children,
} : CardContainerType) => {

    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if(!containerRef || !containerRef.current) return

        const handleMouseMove = (card : HTMLDivElement ,e : MouseEvent) => {
                const rect = card.getBoundingClientRect()
                const x = e.clientX - rect.left
                const y = e.clientY - rect.top
                card.style.setProperty('--mouse-x', `${x}px`)
                card.style.setProperty('--mouse-y', `${y}px`)
        }

        const len = containerRef.current.children.length
        
        for(let i=0; i<=len; i++){
            const card = containerRef.current.children.item(i) as HTMLDivElement | null
            if(!card) return
            containerRef.current.addEventListener("mousemove",(e)=>{
                handleMouseMove(card,e)
            })
        }

        return () => {
            if(!containerRef || !containerRef.current) return
            for(let i=0; i<=len; i++){
                const card = containerRef.current.children.item(i) as HTMLDivElement | null
                if(!card) return
                containerRef.current.removeEventListener("mousemove",(e)=>{
                    handleMouseMove(card,e)
                })
            }
        }
    },[])

    return (
        <div className={style.container}
            ref={containerRef}>
            {children}
        </div>
    )
}

export default Card