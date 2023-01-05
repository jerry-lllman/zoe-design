import { uniqueId } from "@web/tools"
import React from "react"

enum CLASSIFY {
	WORDS,
	IMAGES,
}

export enum COMPONENT_TYPE {
	TEXT = 'text',
}


export const componentsClass = [
	{
		type: CLASSIFY.WORDS,
		title: '文字',
		icon: ''
	},
	{
		type: CLASSIFY.IMAGES,
		title: '图片',
		icon: ''
	}
]

export interface ComponentStyleType {
	top: number,
	left: number,
	width: number,
	height: number,
	fontSize?: number,
	fontWeight?: number
}

export interface ComponentType {
	id: string,
	type: COMPONENT_TYPE,
	rootType: CLASSIFY,
	title: string,
	value: string,
	icon: any, // todo
	style: ComponentStyleType
}


// w = f  h = f * 2 / 10
// w10,   h12,  f10,
// w20,   h24,  f20,
// w30,   h36,  f30,

export const textComponentsJson = [
	{
		id: uniqueId(),
		type: COMPONENT_TYPE.TEXT,
		rootType: CLASSIFY.WORDS,
		title: '标题',
		value: '双',
		icon: '',
		style: {
			top: 100,
			left: 100,
			width: 10,
			height: 12,
			fontSize: 10,
			fontWeight: 700
		}
	},
	{
		id: uniqueId(),
		type: COMPONENT_TYPE.TEXT,
		rootType: CLASSIFY.WORDS,
		title: '正文',
		value: '双击编辑一小段征文',
		icon: '',
		style: {
			top: 0,
			left: 0,
			width: 298,
			height: 38,
			fontSize: 32,
			fontWeight: 400
		}
	}
]

