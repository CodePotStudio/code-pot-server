import { Kind, GraphQLScalarType } from "graphql";
import { validateJSDate, validateDate } from "./validator";
import { serializeDate, parseDate } from "./formatter";

export default {
	Date: new GraphQLScalarType({
		name: "Date",
		description: "Date custom scalar type",
		serialize(value) {
			if (value instanceof Date) {
				if (validateJSDate(value)) {
					return serializeDate(value);
				}
				throw new TypeError("Date cannot represent an invalid Date instance");
			} else if (typeof value === "string") {
				if (validateDate(value)) {
					return value;
				}
				throw new TypeError(
					`Date cannot represent an invalid date-string ${value}.`
				);
			} else {
				throw new TypeError(
					"Date cannot represent a non string, or non Date type " +
						JSON.stringify(value)
				);
			}
		},
		parseValue(value) {
			if (!(typeof value === "string")) {
				throw new TypeError(
					`Date cannot represent non string type ${JSON.stringify(value)}`
				);
			}

			if (validateDate(value)) {
				return parseDate(value);
			}
			throw new TypeError(
				`Date cannot represent an invalid date-string ${value}.`
			);
		},
		parseLiteral(ast) {
			if (ast.kind !== Kind.STRING) {
				throw new TypeError(
					`Date cannot represent non string type ${"value" in ast && ast.value}`
				);
			}
			const { value } = ast;
			if (validateDate(value)) {
				return parseDate(value);
			}
			throw new TypeError(
				`Date cannot represent an invalid date-string ${String(value)}.`
			);
		},
	}),
};
