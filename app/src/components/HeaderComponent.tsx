import { PopoverComponent } from "./molecules/PopoverComponent"

export const HeaderComponent = () => {
  return (
    <div className="fixed top-0 z-50 w-full p-4 bg-white shadow">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-gray-800">ぷんぷん携帯お会計機能😡</h1>
        <div className="space-x-2">
          <PopoverComponent
           title="ごめんね"
           description="素直じゃなくて"
           contents={['ぷんぷん', 'いらいら', 'お会計']}
          />
        </div>
      </div>
    </div>
  )
}