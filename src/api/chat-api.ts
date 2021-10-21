export type ChatMessageType = {
    message: string
    photo: string
    userId: number
    userName: string
}
type SubscriberType = (messages: ChatMessageType[]) => void


let subscribers = [] as SubscriberType[]
let ws: WebSocket | null

const closeHandler = () => {
    console.log('CLOSE')
    setTimeout(createChannel, 1000)
}
const messageHandler = (e: MessageEvent) => {
    let newMessages = JSON.parse(e.data)
    subscribers.forEach(s => s(newMessages))
};

function createChannel() {
    ws?.removeEventListener('close', closeHandler)
    ws?.close()
    ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')
    ws.addEventListener('close', closeHandler)
    ws.addEventListener('message', messageHandler)
}


export const chatAPI = {
    start() {
        createChannel()
    },
    stop(){
        subscribers = []
        ws?.removeEventListener('close', closeHandler)
        ws?.removeEventListener('message', messageHandler)
        ws?.close()
    },
    subscribe(callback: SubscriberType) {
        subscribers.push(callback)
        // Первый вариант отписки (как реализовано в Redux - в Store)
        return () => {
            subscribers = subscribers.filter(s => s !== callback)
        }
    },
    // Второй вариант отписки
    unSubscribe(callback: SubscriberType) {
        subscribers = subscribers.filter(s => s !== callback)

    },
    sendMessage(message: string) {
        ws?.send(message)
    }

}