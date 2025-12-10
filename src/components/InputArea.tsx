interface InputAreaProps {
  inputValue: string;
  isLoading: boolean;
  onInputChange: (value: string) => void;
  onSendMessage: () => void;
  onKeyPress: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

function InputArea({
  inputValue,
  isLoading,
  onInputChange,
  onSendMessage,
  onKeyPress
}: InputAreaProps) {
  return (
    <div className="input-area">
      <div className="input-container">
        <input
          type="text"
          id="messageInput"
          placeholder="Type your question here..."
          autoComplete="off"
          value={inputValue}
          onChange={(e) => onInputChange(e.target.value)}
          onKeyPress={onKeyPress}
          disabled={isLoading}
        />
        <button
          id="sendButton"
          onClick={onSendMessage}
          disabled={isLoading}
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default InputArea;






