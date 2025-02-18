import { eventBusService } from '../../services/event-bus.service.js'
const { useEffect, useState, useRef } = React

export function UserMsg() {
    const [msg, setMsg] = useState(null)
    const timeoutId = useRef()

    useEffect(() => {
        const unsubscribe = eventBusService.on('show-user-msg', (msg) => {
            if (timeoutId.current) clearTimeout(timeoutId.current)
            setMsg(msg)
            timeoutId.current = setTimeout(() => setMsg(null), 2000)
        })

        return () => unsubscribe()
    }, [])

    if (!msg) return null

    return (
        <div className={'user-msg ' + msg.type}>
            <p>{msg.txt}</p>
        </div>
    )
}
