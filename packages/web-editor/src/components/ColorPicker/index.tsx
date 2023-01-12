import { RgbaColorPicker } from "react-colorful";
import { useEffect, useState } from "react";
import { Input, Space } from "antd";
import { hexToRgba, parseColorString, rgbaToHex, toHexString } from "@web/tools";

import type { RgbaColor } from "react-colorful";
import { isEmpty, omit } from "lodash-es";


function isHex(value: string) {
	const hexReg = /^#[0-9 | a-f | A-F]{6}$/g
	return hexReg.test(value)
}

interface ColorPickerProps {
	type?: 'hex' | 'rgba',
	showAlpha?: boolean,
	color?: string | RgbaColor,
	predefineColors?: string[],
	onChange: (color: string) => void
}

export default function ColorPicker(props: ColorPickerProps) {

	const {
		type = 'hex',
		showAlpha = false,
		color = '#ffffff',
		predefineColors = [
			'#ff4500',
			'#ff8c00',
			'#ffd700',
			'#90ee90',
			'#00ced1',
			'#1e90ff',
			'#c71585'
		],
		onChange
	} = props

	const colorString = typeof color === 'string' ? rgbaToHex(color) : toHexString(color)

	const colorObject = typeof color === 'string' ? parseColorString(color) : color

	const hexValue = omit(colorObject, 'a')

	const [visible, setVisible] = useState(false)

	const panelClick = (e: React.MouseEvent<HTMLDivElement>) => {
		e.stopPropagation()
		setVisible(!visible)
	}

	useEffect(() => {
		const handle = () => {
			setVisible(false)
		}

		document.addEventListener('mousedown', handle)
		return () => {
			document.removeEventListener('mousedown', handle)
		}
	}, [])


	const [inputColor, setInputColor] = useState(toHexString(hexValue))

	const inputColorHandle = (value: string, opacity = colorObject.a) => {
		setInputColor(value)
		if (isHex(value)) {
			const rgba = { ...parseColorString(value), a: opacity }
			updateColor(rgba)
		}
	}

	const blurColorHandle = (value: string) => {
		if (isEmpty(value)) {
			setInputColor(toHexString(hexValue))
		}
	}

	const updateColor = (color: RgbaColor) => {
		onChange(toHexString(color))
		setInputColor(toHexString(omit(color, 'a')))
	}

	return (
		<div
			className="h-8 rounded-lg border border-solid border-slate-300 relative"
			style={{ backgroundColor: colorString }}
			onClick={panelClick}
			onMouseDown={e => e.stopPropagation()}
		>
			{
				visible && (
					<div
						className="absolute top-9 left-1/2 -translate-x-1/2 z-50 bg-white p-6 border border-slate-300 rounded-lg"
						onClick={e => e.stopPropagation()}
					>
						<RgbaColorPicker
							color={colorObject}
							onChange={updateColor}
						/>
						<Space wrap className="mt-4">
							<Input
								className=" w-24"
								value={inputColor}
								onChange={e => inputColorHandle(e.target.value)}
								onBlur={e => blurColorHandle(e.target.value)}
							/>
							{
								predefineColors.map(item => (
									<span
										key={item}
										className="h-4 w-4 inline-block"
										style={{ backgroundColor: item }}
										onClick={() => inputColorHandle(item, 1)}
									/>
								))
							}
						</Space>
					</div>
				)
			}
		</div>
	)
}