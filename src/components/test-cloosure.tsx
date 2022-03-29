var test = () => {
    let num = 0
    const effect = () => {
        num += 1
        const message = `num value in message:${num}`
        return function unmount() {
            console.log(message)
        }
    }
    return effect
}
// 执行test，返回effect函数
var add = test()
// 执行efect函数，返回了引用message1的unmount函数
var unmount = add()
// 再一次执行effect函数，返回了引用message2的unmount函数
add()
// message3
add()
// message4
unmount()
console.log(add)

export default test