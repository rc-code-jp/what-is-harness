/** ドメインのルール違反を表すエラー。外側の層はこれを見て「入力が悪い」と判断する */
export class DomainError extends Error {
  constructor(message: string) {
    super(message);
    this.name = new.target.name;
  }
}

export class InvalidTodoTextError extends DomainError {}

export class InvalidTodoIdError extends DomainError {}

export class TodoNotFoundError extends DomainError {}
