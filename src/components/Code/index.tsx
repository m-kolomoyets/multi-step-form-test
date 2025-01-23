import { memo } from 'react';
import { Highlight } from 'prism-react-renderer';
import { cn } from '@/utils/cn';

interface CodeProps {
    code: unknown;
}

const Code: React.FC<CodeProps> = ({ code }) => {
    return (
        <Highlight code={JSON.stringify(code, null, 2)} language="json" theme={{ plain: {}, styles: [] }}>
            {({ className, style, tokens, getLineProps, getTokenProps }) => {
                return (
                    <pre
                        className={cn(className, 'flex overflow-x-auto font-mono text-base leading-[170%] text-white')}
                        style={style}
                    >
                        <code className="px-4">
                            {tokens.map((line, lineIndex) => {
                                return (
                                    <div key={lineIndex} {...getLineProps({ line })}>
                                        {line.map((token, tokenIndex) => {
                                            return <span key={tokenIndex} {...getTokenProps({ token })} />;
                                        })}
                                    </div>
                                );
                            })}
                        </code>
                    </pre>
                );
            }}
        </Highlight>
    );
};

export default memo(Code);
