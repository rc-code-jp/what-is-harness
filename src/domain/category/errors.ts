import { DomainError } from "@/domain/todo/errors";

export class InvalidCategoryNameError extends DomainError {}

export class InvalidCategoryIdError extends DomainError {}

export class CategoryNotFoundError extends DomainError {}
