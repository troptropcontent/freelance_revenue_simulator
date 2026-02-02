
import { Models } from "../constants"

function AdviceCardAvatar({ model, onClick }: { model: keyof typeof Models, onClick: () => void }) {
    return <div onClick={onClick} className="[&:hover+.avatar-name]:block size-14 rounded-full bg-size-[73.67px] bg-center hover" style={{ backgroundImage: `url(${Models[model].avatar})` }}></div>
}

export { AdviceCardAvatar }