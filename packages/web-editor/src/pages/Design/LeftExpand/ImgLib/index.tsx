
import { randomId } from '@web/tools'
import ImgPath from '../../../../assets/react.svg'
import { CLASSIFY } from '../../Left/componentTypes'
import { useCanvasByContext } from '../../store/hooks'
import { ImageComponentType } from './typing.'


function createImageComponent(): ImageComponentType {
	return {
		id: randomId(),
		type: 'image',
		rootType: CLASSIFY.IMAGES, // TODO: 这个是大的集合
		title: '',
		value: ImgPath,
		icon: '', // todo
		style: {
			top: 10,
			left: 10,
			width: 100,
			height: 100
		}
	}
}

const array: ImageComponentType[] = []

for (let i = 0; i < 100; i++) {
	array.push(createImageComponent())
}

export default function ImgLib() {


	const canvas = useCanvasByContext()

	return (
		<div className='grid grid-cols-3 gap-4 p-[24px] text-center'>
			{
				array.map(item => (
					<img key={item.id} src={item.value} onClick={() => canvas.addComponent(item)} />
				))
			}
		</div>
	)
}