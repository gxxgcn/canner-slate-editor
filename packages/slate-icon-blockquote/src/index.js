// @flow
import * as React from 'react';
import type {IconProps} from 'shared/src/types';
import ToolbarIcon from '@canner/slate-icon-shared';
import blockquote, {DEFAULT} from '@canner/slate-helper-block-quote';
import {BLOCKQUOTE} from '@canner/slate-constant/lib/blocks';
import EditBlockquote from 'slate-edit-blockquote'
import commonNode from '@canner/slate-editor-renderer/lib/commonNode';

type Props = IconProps;

export const BlockquotePlugin = (type = BLOCKQUOTE) => {
  return {
    renderNode: (props) => {
      if (props.node.type === type) 
        return commonNode('blockquote')(props);
    }
  }
}

export default class Blockquote extends React.Component<Props> {
  typeName: string

  constructor(props: Props) {
    super(props);

    this.typeName = props.type || BLOCKQUOTE;
    
    // change to customize type
    DEFAULT.type = this.typeName
    this.blockquote = EditBlockquote(DEFAULT).utils;
  }

  onClick = (e: Event) => {
    let {change, onChange} = this.props;
    e.preventDefault();
    onChange(blockquote(change, {type: this.typeName}));
  }

  render() {
    const {change, icon, ...rest} = this.props;
    const onClick = e => this.onClick(e);

    return (
      <ToolbarIcon
        type={this.typeName}
        icon={icon || 'Blockquote'}
        onClick={onClick}
        isActive={this.blockquote.isSelectionInBlockquote(change.value)}
        {...rest}
      />
    );
  }
}
