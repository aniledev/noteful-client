import React from 'react'
import './AddNote.css'

export default function AddNote(props) {
  const { className, ...otherProps } = props
  return (
    <form
      className={['AddNote', className].join(' ')}
      action='#'
      {...otherProps}
    />
  )
}
