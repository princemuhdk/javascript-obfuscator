import 'format-unicorn';

import { TNodeWithBlockStatement } from '../../types/TNodeWithBlockStatement';
import { TStatement } from '../../types/TStatement';

import { IOptions } from '../../interfaces/IOptions';

import { AppendState } from '../../enums/AppendState';

import { DebugProtectionFunctionIntervalTemplate } from '../../templates/custom-nodes/debug-protection-nodes/debug-protection-function-interval-node/DebugProtectionFunctionIntervalTemplate';

import { AbstractCustomNode } from '../AbstractCustomNode';
import { NodeAppender } from '../../node/NodeAppender';
import { NodeUtils } from '../../node/NodeUtils';

export class DebugProtectionFunctionIntervalNode extends AbstractCustomNode {
    /**
     * @type {AppendState}
     */
    protected appendState: AppendState = AppendState.BeforeObfuscation;

    /**
     * @type {string}
     */
    private debugProtectionFunctionName: string;

    /**
     * @param debugProtectionFunctionName
     * @param options
     */
    constructor (debugProtectionFunctionName: string, options: IOptions) {
        super(options);

        this.debugProtectionFunctionName = debugProtectionFunctionName;
    }

    /**
     * @param blockScopeNode
     */
    public appendNode (blockScopeNode: TNodeWithBlockStatement): void {
        NodeAppender.appendNode(blockScopeNode, this.getNode());
    }

    /**
     * @returns {TStatement[]}
     */
    protected getNodeStructure (): TStatement[] {
        return NodeUtils.convertCodeToStructure(
            DebugProtectionFunctionIntervalTemplate().formatUnicorn({
                debugProtectionFunctionName: this.debugProtectionFunctionName
            })
        );
    }
}
