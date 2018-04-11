/*
* Просто инпут. В отрыве от филда его использовать нельзя — верстка поплывет.
* У инпута есть два типа «серых подсказок»: placeholder и hint
* placeholder реализован в обход нативного атрибута <input placeholder='' /> по двум причинам
* 1. Мы поддерживаем ie
* 2. Нам нужен особый режим с префиксом: например когда инпут содержит value '+7 (', но плейсхолдер
*    надо отображать (в виде '926) 123-45-67')
* placeholder исчезает, если value становится длиннее prefix
* hint появляется, если value длиннее prefix
*/

import React, { PureComponent } from 'react'
import cx from 'classnames'
import keycode from 'keycode'
import omit from '@tinkoff/utils/object/omit'
import { isMS } from '../../utils/userAgent'

import s from './Input.css'

const isValue = value => !!value || value === 0
const getLabelClassNames = ({ value, focused, readOnly, labelPrimary, isRequired }) => (
    cx({
        [s.label]: true,
        [s.label_primary]: labelPrimary,
        [s.label_isRequired]: isRequired,
        [s.label_secondary]: !labelPrimary,
        [s.label_changed]: isValue(value),
        [s.label_focused]: !readOnly && focused,
    })
)
const getValueClassNames = ({ label, value, focused, readOnly, labelPrimary }) => (
    cx({
        [s.value]: true,
        [s.value_primary]: !labelPrimary,
        [s.value_secondary]: labelPrimary,
        [s.value_focused]: !readOnly && focused && !!label,
        [s.value_changed]: !!label && isValue(value),
        [s.value_alone]: !label,
    })
)

type Props = {
    autoComplete: boolean,
    focused: boolean,
    handleRef: ?HTMLInputElement => void,
    isRequired: boolean,
    label: ?string,
    labelPrimary: boolean,
    placeholder: string,
    readOnly: boolean,
    onEnter: () => void,
    value: string,
    prefix: string,
    onBlur: SyntheticFocusEvent<HTMLInputElement> => void,
    onKeyDown: (event: SyntheticKeyboardEvent<HTMLInputElement>) => void,
    hint?: string,
    noFade: boolean,
}
type State = {
    key: number
};

const EMPTY_STRING = ''

export default class InputAtom extends PureComponent<Props, State> {
    static defaultProps = {
        onKeyDown: () => {},
        onEnter: () => {},
        autoComplete: false,
        focused: false,
        isRequired: false,
        label: EMPTY_STRING,
        labelPrimary: false,
        placeholder: EMPTY_STRING,
        readOnly: false,
        value: EMPTY_STRING,
        prefix: EMPTY_STRING,
        noFade: false,
    }

    state = {
        key: 0,
    }

    handleBlur = (event: SyntheticFocusEvent<HTMLInputElement>): void => {
        // костыль чтобы IE и Edge переносил текст в начало при потере фокуса
        if (isMS()) {
            this.setState({ key: this.state.key === 0 ? 1 : 0 })
        }
        this.props.onBlur(event)
    }
    handleKeyDown = (event: SyntheticKeyboardEvent<HTMLInputElement>): void => {
        if (keycode(event) === 'enter') {
            event.preventDefault()
            event.stopPropagation()
            this.props.onEnter()
        }
        this.props.onKeyDown(event)
    }
    renderValue = (valueClassName: string) => {
        const {
            value, autoComplete, readOnly, handleRef, ...rest
        } = omit(['isRequired', 'focused', 'labelPrimary', 'hint', 'noFade', 'onEnter', 'placeholder'], this.props)

        if (readOnly) {
            return (
                <div className={valueClassName}>{value}</div>
            )
        }

        // @todo прокинуть все нужные свойства в инпут явно
        return (
            <input
                {...rest}
                onKeyDown={this.handleKeyDown}
                key={this.state.key}
                onBlur={this.handleBlur}
                autoComplete={autoComplete ? 'on' : 'off'}
                className={valueClassName}
                value={value}
                ref={handleRef}
            />
        )
    }

    renderHint (cls: string) {
        const { placeholder, value, prefix, hint, focused } = this.props

        const showHint = !placeholder || value.length > prefix.length

        if (typeof hint === 'string' && showHint && focused) {
            const hintTail = hint.substring(value.length)
            // Нельзя hint.replace(value, '') потому что начало hint может отличаться от value на крайний символ value ← будет скакать при наборе

            return (
                <div className={cx(cls, s.backgroundHint)}>
                    <span className={s.transparent}>{value}</span>
                    <span className={s.hint}>{hintTail}</span>
                </div>
            )
        }

        return null
    }

    render () {
        const {
            label, labelPrimary, readOnly, focused, value, isRequired,
            placeholder, noFade, prefix,
        } = this.props
        const valueClassName = getValueClassNames({
            focused, label, labelPrimary, value, readOnly,
        })
        let visiblePlaceholder = ''

        if (focused) {
            if (!value) {
                visiblePlaceholder = placeholder
            } else if (value && prefix && prefix.startsWith(value)) {
                visiblePlaceholder = placeholder.substring(value.length)
            }
        }

        return (
            <label className={cx(s.wrapper, {
                [s.wrapper_focused]: focused,
                [s.wrapper_noFade]: noFade,
            })}>
                {visiblePlaceholder && (
                    <span className={cx(s.label, s.foo, valueClassName)}>
           <span className={s.transparent}>{value}</span>
           <span className={s.placeholder}>{visiblePlaceholder}</span>
         </span>
                )}
                {!!label && (
                    <span
                        className={getLabelClassNames({
                            focused,
                            isRequired,
                            value,
                            readOnly,
                            labelPrimary,
                        })}
                    >{label}</span>
                )}
                {this.renderHint(valueClassName)}
                {this.renderValue(valueClassName)}
            </label>
        )
    }
}