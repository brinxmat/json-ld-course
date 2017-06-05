#JSON-LD workshop

Plan:

| Time        | Activity                         |
| :---------- | :------------------------------- |
| 10:00-10:20 | Start-up, introductions, outline |
| 10:20-10:50 | Background: situating JSON-LD    |
| 10:50-11:00 | Break                            |
| 11:00-11:30 | JSON-LD tooling                  |
| 11:30-12:00 | First steps with JSON-LD         |
| 12:00–13:00 | Lunch                            |
| 13:00-13:50 | Patterns in JSON-LD              |
| 13:50-14:00 | Break                            |
| 14:00-14:50 | Framing                          |
| 14:50-15:00 | Break                            |
| 15:00-15:45 | Further considerations           |
| 15:45-16:00 | Wrapping up                      |

## What is JSON-LD?

### What is JSON?

In order to understand some of the motivation for JSON-LD, it is worth looking at the basics of JSON.

JavaScript Object Notation:

>JSON (JavaScript Object Notation) is a lightweight data-interchange format. It is easy for humans to read and write. It is easy for machines to parse and generate. It is based on a subset of the JavaScript Programming Language, Standard ECMA-262 3rd Edition - December 1999. JSON is a text format that is completely language independent but uses conventions that are familiar to programmers of the C-family of languages…. These properties make JSON an ideal data-interchange language.

[http://json.org/](http://json.org/)

What this means is that JSON is a packaging used to transfer data.

Make what you will of the claims made about JSON being easy to read and write, the rest of the claims seem to hold water as long as one accepts that there is no need for complex data types in data-interchange formats. We will return to this point later.

In terms of structure, JSON is composed of:

- A collection of name/value pairs
- An ordered list of values

Thus, JSON is very simple. A basic object looks like this: ```{"name": "value"}```, the content of value can be a string as shown, or one of:

- number
- object
- array
- boolean
- null

###Valid JSON 
In the original specification (each new line is a data structure):

```
{}
[]
```

In the ECMA-404 specification (each new line is a data structure):

```
1
true
null
```
### Limitations of the JSON format

- No support for data structures beyond boolean, number, string, object, array, null
- JSON sort-of executable JavaScript
- Document based
- Badly formulated JSON has all the weaknesses of other badly formulated document formats
- No comments (really an issue?)

## JSON Schema
It is worth mentioning [JSON Schema](http://json-schema.org/), which makes it possible to apply some of the constraints that JSON does not otherwise support, in order to fix some of the percieved issues with JSON. 

For example:

Schema:

```
{   
    "$schema": "http://json-schema.org/schema#",
    "title": "Place",
    "type": "object",
    "properties": {
        "name": {
            "type": "string"
        },
        "longitude": {
            "description": "Longitude in degrees",
            "type": "number",
            "minimum": -181,
            "exclusiveMinimum": true,
            "maximum": 181,
            "exclusiveMaximum": true
        },
        "latitude": {
            "description": "Latitude in degrees",
            "type": "number",
            "minimum": -91,
            "exclusiveMinimum": true,
            "maximum": 91,
            "exclusiveMaximum": true
        }
    },
    "required": ["longitude", "latitude"]
}
```
Which specifies that "Place" is an object and that the object must contain a "longitude" and "latitude" key-value pairs.

For which, the following validates:

```
[
    {
        "longitude": -5,
        "latitude": 10
    }, {
        "latitude": 63.429722,
        "longitude": 10.393333,
        "name": "Trondheim"
    }, {
        "longitude": 63.290556,
        "latitude": 9.088889,
        "name": "Kyrksæterøra",
        "population": 2502
    }
]
```
Problems? Minimum? "number"

### How is JSON used?

JSON is used in services that supply data to websites, this data is typically taken and rendered as HTML, to make it human readable, thus, a data structure like:

```
{
    "name": "Jim Smith",
    "address": "31 Letsby Avenue",
    "occupation": "Policeman",
    "children": [
        {
            "name": "Jane Smith",
            "address": "31 Letsby Avenue",
            "occupation": "Schoolchild"
        }
    ]
}
```
Will can be used to generate HTML like:

```
<!DOCTYPE html>
<html>
  <head>
    <title>Person: Jim Smith (Policeman)<title>
  </head>
  <body>
    <h1 class="name">Jim Smith</h1>
    <div class="address">31 Letsby Avenue</div>
    <div class="occupation">Policeman</div>
    <div class="children">
      <div class="child" id="child_1">Jane Smith</div>
    </div>
  </body>
</html>
```
Here, we see a clearly one-to-one relationship between the HTML and the JSON, but it need not be that way.

The problem with this approach is that whatever data is returned is likely described only in documentation for the API, if at all. While there are solutions like [Swagger](http://swagger.io/) that make this easier for a developer, the basic problem remains: the data from each source isn't aligned so that ```address``` is formatted in the same way, things are described using the same terms (name/label, address/addr, children/offspring, policeman/constable, schoolchild/schoolgirl/student).

## Solving the problem of ambiguity on the web with linked data

The problem of ambiguity of terms is well-known in libraries; we develop controlled vocabularies for exactly this reason. Linked data, put simply provides a mechanism for describing things using links, including the terms.

In simple terms, the links act as relations, and provide a dereferenceable name for the terms; whether they be content terms or vocabulary. Dereferencing the link provides more information.

For the simplest case, linked data provides absolute references for what is meant by a term such as "name", thus ```http://example.org/ontology#name``` can used and we can know that documents that use this term use the term in the way specified when one dereferences the term — so that we get the "name", rather than say "nickname", "user ID" or some other possible content.

## Why JSON-LD?

> [I]t’s not about [the Semantic Web] at all. JSON-LD was created for Web Developers that are working with data that is important to other people and must interoperate across the Web. The Semantic Web was near the bottom of my list of “things to care about” when working on JSON-LD, and anyone that tells you otherwise is wrong. 

[Manu Sporny: 
JSON-LD and Why I Hate the Semantic Web](http://manu.sporny.org/2014/json-ld-origins-2/)

From this document, the motivations behind JSON-LD are clear:

* as an API, the Semantic Web doesn't work
* "RDF is a shitty data model"
* Web developers don't understand or want anything other than JSON
* Semantic web stuff is unnecessary for most applications
* All we need is a concise way of expressing property/class information in JSON

So what is JSON-LD?

* a graph data model in JSON (a document?)
* somewhat compatible with RDF
* it is JSON if it is nothing else
* a format for linked data on the Web

## Javascript Object Notation for Linking Data

Note that the LD in the name JSON-LD is not "linked data", but "for linking data". Linked data is — whether we like it or not — closely tied to RDF and the traditional semantic web, even though this is not necessarily entailed by the term (RDF is simply a *best practice recommendation* in Berners-Lee's [Five star linked data concept](https://www.w3.org/DesignIssues/LinkedData.html)). 

JSON-LD provides a packaging for data that allows us to use linked data in a simple way that will not get in the way for users who are not interested in the semantics of the terms, but just want quick-and-dirty access to the data. This means for most native JSON-LD that little tooling is required beyond the standard JSON parser, which means that developers don't need to care about or understand the Semantic Web to use the data.

## Should *we* care about RDF?

Library data is the kind of data that is typically well suited to representations in graphs, and it has been demonstrated that semantic technologies can be used to good effect in bibliographic description. 

I'd argue that RDF provides a good way of describing our data and that this is something that we should continue to explore. At Oslo public library, RDF has provided a simple, extensible framework that can be used for all material types and provides access to data and flexible options for working with that data.

Nevertheless, getting data from such a utilitarian data model to a suitable display format without having to do silly things (display strings in the data) isn't always easy.

JSON-LD's compatibility with RDF provides a solution to several of the problems perceived by front-end developers who are unfamiliar with RDF — at the same time as providing direct support for linked data. This is a win-win.

Those that want to use RDF, SPARQL and the Semantic Web stack can, those that want to use document stores can and those that produce data from other sources can mark up data from their APIs to make them "semantic" in a quick and simple way.

Suffice to say, you can use JSON-LD:

* As JSON, as a document
* As a step between RDF and HTML

## The approach we will take here

We start by looking at the basic structures in JSON-LD, building up valid JSON-LD documents that demonstrate the way in which JSON-LD can be used to mark up data so that it can be interpreted semantically.

We will look at how framing can be used to create views of existing JSON-LD documents, how this can be used in 

## First steps

> We're simply assuming that you've downloaded and built [the course services](https://github.com/brinxmat/json-ld-course).

Convert the following JSON document to a JSON-LD document:

```
{
    "name": "Smith, Sandy",
    "birthDate": "1978-02-21",
    "nationality": "British"
}
```
Simplest way:

> [Example 1: Adding context](http://localhost:3211/json-ld.org/playground/#startTab=tab-expanded&json-ld=http%3A%2F%2Flocalhost%3A3211%2Fdocument%2Fa001)

```
{
    "@context": "http://localhost:3211/context/a001.jsonld",
    "name": "Smith, Sandy",
    "birthDate": "1978-02-21",
    "nationality": "British"
}
```

In JSON-LD playground, looking at the data on the different tabs, we notice that the context has been applied, so that *name* is now equivalent to *http://localhost:3211/context/a001#name*.

The context here is a file that can be dereferenced, the vocabulary it defines applies to the entire JSON document; this is similar to namespaced vocabularies in RDF.

If we dereference the context document directly, we see:

```
{
  "@context": {
    "course": "http://localhost:3211/context/a001#",
    "name": "course:name",
    "birthDate": "course:birthDate",
    "nationality": "course:nationality"
  }
}
```
Rather than simply linking to the context-document, we could have included it directly in the JSON:

> [Example 2: Adding context](http://localhost:3211/json-ld.org/playground/#startTab=tab-expanded&json-ld=http%3A%2F%2Flocalhost%3A3211%2Fdocument%2Fa002)

```
{
  "@context": {
    "course": "http://localhost:3211/ontology#",
    "name": "course:name",
    "birthDate": "course:birthDate",
    "nationality": "course:nationality"
  },
  "name": "Smith, Sandy",
  "birthDate": "1978-02-21",
  "nationality": "British"
}
```

### Terms

In JSON-LD there are a number of keywords prefixed with **@**, these are called **terms**. We will quickly cover the basic terms.

#### @context

We start with **@context** because we have already seen the **@context** object at work.

Think of **@context** in the same way you would if someone talked about a **context for a discussion** — a way of making it clear what we're talking about and thereby how to interpret the terms that are used. 

Thus, we are not talking about a generic concept "name", we are talking the specific concept in our ontology.

**@context** can, as we have seen, be an IRI, which is dereferenced or an object.

[Exercise 1: Adding context](http://localhost:3211/json-ld.org/playground/#startTab=tab-compacted&json-ld=http%3A%2F%2Flocalhost%3A3211%2Fexercises%2Fe001)

#### @id

JSON-LD introduces **@id** to provide support for IRIs as universal identifiers. This is probably the biggest innovation in JSON-LD, but also one it is easy to forget because it is often implicit*.

**@id** allows us to say that objects have a specific IRI and refer to these, thus we can say that **an object** has **an identifier**, and that it is related to **another object** that has **another identifier**.

*NB:* @id works at the level of **object**, which mean that there is no **document** IRI concept in JSON-LD.

Exercise: Try adding and removing @ids.

#### @value
With many properties, you just want a bare value, say 2, "Nice" or false, other times, you want to say more about the object of the property, here **@value** allows us to say that there is a value for the property, which can then be augmented with other data.

#### @language

We often want to talk about the language of a property, with **@language** and **@value** we can create an object that has a language:

> [Example: Language simple](http://localhost:3211/json-ld.org/playground/#startTab=tab-expanded&json-ld=http%3A%2F%2Flocalhost%3A3211%2Fpartial%2Fp001)

```
{
	"@context": {
		"weather": "http://example.com/ontology#weather"
	},
	"weather": {
		"@value": "Solen skinner",
		"@language": "no"
	}
}
```
It is possible to use **@language** to set a default language for the document:

>[Example: Language document default](http://localhost:3211/json-ld.org/playground/#startTab=tab-expanded&json-ld=http%3A%2F%2Flocalhost%3A3211%2Fpartial%2Fp002)

```
{
	"@context": {
		"weather": "http://example.com/ontology#weather",
      "@language": "no"
    },
	"weather": "Solen skinner"
}
```

We return to the language concepts in JSON-LD later in more detail.

[Exercise 2: Tagging strings for language](http://localhost:3211/json-ld.org/playground/#startTab=tab-compacted&json-ld=http%3A%2F%2Flocalhost%3A3211%2Fexercises%2Fe002)

#### @type

Datatypes for nodes or typed values are expressed with an **@type** keyword.

>[Example: Adding types](http://localhost:3211/json-ld.org/playground/#startTab=tab-expanded&json-ld=http%3A%2F%2Flocalhost%3A3211%2Fpartial%2Fp003)

```
{
	"@context": {
		"xsd": "http://www.w3.org/2001/XMLSchema#",
		"label": "http://example.com/ontology#label",
		"date": "http://example.com/ontology#date",
		"DateOfThingHappeningClass": "http://example.com/ontology#DateOfThingHappening"
	},
	"@type": "DateOfThingHappening",
	"label": "By Grand Central station, I sat down and wept",
	"date": {
		"@value": "2012-02-21",
		"@type": "xsd:date"
	}
}
```

**NB:** here I introduce (see: *xsd*) a what is called a compacted IRI in JSON-LD-speak, this is similar to an XML namespace. We will come back to this again in a moment.

In this example, we have an event where I sat down and wept, this event is represented by an object with the type "DateOfThingHappening"; the object of the *date* property has a type of *xsd:date*, which is interpreted as an ISO-8601 compatible date.

[Exercise 3: Datatypes](http://localhost:3211/json-ld.org/playground/#startTab=tab-compacted&json-ld=http%3A%2F%2Flocalhost%3A3211%2Fexercises%2Fe003)

[Exercise 4: More datatypes](http://localhost:3211/json-ld.org/playground/#startTab=tab-compacted&json-ld=http%3A%2F%2Flocalhost%3A3211%2Fexercises%2Fe004)

#### @container, @set and @list

The **@container** keyword allows us to associate a specific type for container objects; this sounds tautological, but the syntax of JSON-LD allows for two kinds of syntactic container: arrays in all cases except language maps (which we will come back to in detail below).

In JSON-LD an array is generally considered to be an unordered list; one can specify that an array is explicitly unordered by using the *@set* keyword. 

In cases where an explicitly ordered list is required, the *@list* keyword can be used.

>[Example: Lists and sets](http://localhost:3211/json-ld.org/playground/#startTab=tab-expanded&json-ld=http%3A%2F%2Flocalhost%3A3211%2Fpartial%2Fp004)

```
{
	"@context": {
		"names": {
			"@id": "http://localhost:3211/ontology#names",
			"@container": "@set"
		},
		"alphabeticalNames": {
			"@id": "http://localhost:3211/ontology#alphabeticalNames",
			"@container": "@list"
		}
	},
	"names": ["Jim", "Jimmy", "Jimmie", "Jimi", "James", "Jimbo"],
	"alphabeticalNames": ["James", "Jim", "Jimbo", "Jimi", "Jimmie", "Jimmy"]
}
```

[Exercise 5: Coercing things into arrays](http://localhost:3211/json-ld.org/playground/#startTab=tab-compacted&json-ld=http%3A%2F%2Flocalhost%3A3211%2Fexercises%2Fe005)

#### @reverse

The **@reverse** term reverses property's relational semantics, thus if we have a term *eats*, applying **@reverse** to it makes it semantically equivalent to *eatenBy* and the term can be used to relate an edible item to its eaters. For example:

Normal usage:

>[Example: Reverse (without)](http://localhost:3211/json-ld.org/playground/#startTab=tab-expanded&json-ld=http%3A%2F%2Flocalhost%3A3211%2Fpartial%2Fp005)

```
{
    "@context": {
        "eats": "http://example.org/ontology#eats"
    },
    "@id": "http://example.org/people/Sandy",
    "eats": "http://example.org/food/Cake"
}
```
With **@reverse**:

>[Example: Reverse (with)](http://localhost:3211/json-ld.org/playground/#startTab=tab-expanded&json-ld=http%3A%2F%2Flocalhost%3A3211%2Fpartial%2Fp006)

```
{
    "@context": {
        "eats": "http://example.org/ontology#eats"
    },
    "@id": "http://example.org/food/Cake",
    "@reverse": {
        "eats": {
            "@id": "http://example.org/people/Sandy"
        }
    }
}
```

The way this works becomes much clearer with the NQuads view, where the roles of the subject and object are swapped.

[Exercise 6: Reversing semantics](http://localhost:3211/json-ld.org/playground/#startTab=tab-compacted&json-ld=http%3A%2F%2Flocalhost%3A3211%2Fexercises%2Fe006)

#### @container, @index

Using the **@index** term makes data access easy, it adds a syntactic abstraction layer that makes it easy for programs to get the data in a predefined way.

For example, given a data structure for a controlled vocabulary that is not marked up with **@index**:

>[Example: Index (without)](http://localhost:3211/json-ld.org/playground/#startTab=tab-expanded&json-ld=http%3A%2F%2Flocalhost%3A3211%2Fpartial%2Fp007)

```
{
	"@context": {
		"concept": "http://example.com/ontology#concept",
		"translation": "http://example.com/ontology#translation",
		"label": "http://example.com/ontology#label",
		"language": "http://example.com/ontology#language"
	},
	"@id": "http://example.com/concept/N0001",
	"label": "Schadefreude",
	"translation": [{
			"language": "German",
			"label": "Schadenfreude"
		},
		{
			"language": "English",
			"label": "Schadenfreude"
		}
	]
}
```
This makes it quite hard to access the terms in the data in a way that makes sense if one wants to present entry points based on language.

In order to do this, you can add the **@index** as the **@container**:

>[Example: Index (with)](http://localhost:3211/json-ld.org/playground/#startTab=tab-expanded&json-ld=http%3A%2F%2Flocalhost%3A3211%2Fpartial%2Fp008)

```
{
	"@context": {
		"concept": "http://example.com/ontology#concept",
		"translation": {
			"@id": "http://example.com/ontology#translation",
			"@container": "@index"
		},
		"label": "http://example.com/ontology#label",
		"language": "http://example.com/ontology#language"
	},
	"@id": "http://example.com/concept/N0001",
	"label": "Schadefreude",
	"translation": {
		"de": {
			"language": "German",
			"label": "Schadenfreude"
		},
		"en": {
			"language": "English",
			"label": "Schadenfreude"
		}
	}
}
```

This second data structure is syntactically different to the first, but semantically identical. The keys "de" and "en" are completely ignored when converting to RDF, while a developer can access the data by requesting:

[//]: # (SLIDE!!)
 
```const german = object.translation.de.label```

This means that the code doesn't have to dig deep into the data structure to analyse what there is and what is needed.

We used a language based example here, we'll return with more examples reagarding languages later.

[Exercise 7: Indexer-friendly syntax](http://localhost:3211/json-ld.org/playground/#startTab=tab-compacted&json-ld=http%3A%2F%2Flocalhost%3A3211%2Fexercises%2Fe007)

#### @base, @vocab

In the same way as most other serialisations, it is possible to set base values for things used in the JSON-LD document. 

The **@base** keyword allows us to set a IRI base for relative IRIs (setting ```"@base": "http://example.com/people/"``` will expand ```"@id": "1/Kim"``` to ```"@id": "http://example.com/people/1/Kim"``` . 

Similarly, a base value can be set for vocabulary items with the **@vocab** element, so that we can set ```"@vocab": "http://example.org/ontology#"``` and expect all relative properties and types to be expanded with this.

>[Example: @Base and @vocab](http://localhost:3211/json-ld.org/playground/#startTab=tab-expanded&json-ld=http%3A%2F%2Flocalhost%3A3211%2Fpartial%2Fp009)

```
{
	"@context": {
		"@base": "http://example.org/person/",
		"@vocab": "http://example.org/ontology#"
	},
	"@id": "1/Kim",
	"age": 15,
	"name": "Kim"
}
```
[Exercise 8: Making things pretty](http://localhost:3211/json-ld.org/playground/#startTab=tab-compacted&json-ld=http%3A%2F%2Flocalhost%3A3211%2Fexercises%2Fe008)

#### @graph

JSON-LD implements a graph in JSON, as this is the case, all data is contained in a "@graph", in cases where we have a single object, this will not be apparent unless one views the data in a specific way (flattened, we'll come back to this shortly) because the default graph that exists independently of everything else is suppressed when one only has one object.

In cases where we want to use named graphs — say to compare new and old data — we can do so:

>[Example: @graph](http://localhost:3211/json-ld.org/playground/#startTab=tab-expanded&json-ld=http%3A%2F%2Flocalhost%3A3211%2Fpartial%2Fp010)

```
{
	"@context": {
		"@base": "http://example.org/person/",
		"@vocab": "http://example.org/ontology#"
	},
	"@graph": [{
			"@id": "http://example.org/graph/original",
			"@graph": [{
				"@id": "1/Kim",
				"age": 15,
				"name": "Kim"
			}]
		},
		{
			"@id": "http://example.org/graph/update",
			"@graph": [{
				"@id": "1/Kim",
				"age": 16,
				"name": "Kim"
			}]
		}
	]
}
```

#### @nest

I can't get this to work. It looks quite cool, it allows a nested object that collects key/values, so say all prefLabels and altLabels are in one object, which would make some indexing tasks easier.

#### @version

I can't get this to work. It allows the **@context** to specify a value for **@version** (say "1.1"), which is the intent/compatibility level for the context. This secures compatibility over time if breaking changes in behaviour come in new versions. 

Compatibility level can be specified when initialising the JSON-LD parser.

### Different representations of JSON-LD

Note that there are several possible representations of this data in JSON-LD, these are provided by processing the data with the JSON-LD API algorithms:

* [expansion](https://www.w3.org/TR/json-ld-api/#expansion)
* [compaction](https://www.w3.org/TR/json-ld-api/#compaction)
* [flattening](https://www.w3.org/TR/json-ld-api/#flattening)

The first of these, expansion, *expands* the property references and removes the context object from the JSON. For example:

> [Example two: Adding context (Expanded)](http://localhost:3211/json-ld.org/playground/#startTab=tab-expanded&json-ld=http%3A%2F%2Flocalhost%3A3211%2Fdocument%2Fa002)

```
[
  {
    "http://localhost:3211/ontology#birthDate": [
      {
        "@value": "1978-02-21"
      }
    ],
    "http://localhost:3211/ontology#name": [
      {
        "@value": "Smith, Sandy"
      }
    ],
    "http://localhost:3211/ontology#nationality": [
      {
        "@value": "British"
      }
    ]
  }
]
```
This can be useful in contexts where a single, regular representation of data is required. All properties are expressed as IRIs and all values are represented as an array of objects; the context information is not lost, it is simply stored locally in each value. 

This is a particularly verbose representation, but one which can be used with simple processors that understand nothing of JSON-LD.

The second representation, compaction, provides structure for data that can be used for particular applications. 

> [Example two: Adding context (Compacted)](http://localhost:3211/json-ld.org/playground/#startTab=tab-compacted&json-ld=http%3A%2F%2Flocalhost%3A3211%2Fdocument%2Fa002)

```
{
  "http://localhost:3211/ontology#birthDate": "1978-02-21",
  "http://localhost:3211/ontology#name": "Smith, Sandy",
  "http://localhost:3211/ontology#nationality": "British"
}
```
Supplying a context makes it possible to compact the properties to terms and makes the data easier to work with in most programming jobs.

> [Example three: Adding context (Compacted with context)](http://localhost:3211/json-ld.org/playground/#startTab=tab-compacted&json-ld=http%3A%2F%2Flocalhost%3A3211%2Fdocument%2Fa003&context=http%3A%2F%2Flocalhost%3A3211%2Fcontext%2Fa003.jsonld)

```
{
  "@context": {
    "course": "http://localhost:3211/ontology#",
    "name": "course:name",
    "birthDate": "course:birthDate",
    "nationality": "course:nationality"
  },
  "birthDate": "1978-02-21",
  "name": "Smith, Sandy",
  "nationality": "British"
}
```

The third representation, flattening, is similar to expansion, but takes the simplification of the structure of the document a step further, forcing every property of a node into a single object, and labelling everything that is a blank node.

In our case, the fact that we have an implicit blank node is made explicit and the *@graph* is added to wrap the node we are describing.

> [Example two: Adding context (Flattened)](http://localhost:3211/json-ld.org/playground/#startTab=tab-flattened&json-ld=http%3A%2F%2Flocalhost%3A3211%2Fdocument%2Fa002)

```
{
  "@graph": [
    {
      "@id": "_:b0",
      "http://localhost:3211/ontology#birthDate": "1978-02-21",
      "http://localhost:3211/ontology#name": "Smith, Sandy",
      "http://localhost:3211/ontology#nationality": "British"
    }
  ]
}
```
Why is this useful? This results in a deterministic structure for the data — it is entirely predictable for every document that is processed in the same way. This simplifies processing, but creates data that is difficult to read.

Note that if we have passed a context object to flattening algorithm, it looks like this:

```
{
  "@context": {
    "course": "http://localhost:3211/context/a001#",
    "name": "course:name",
    "birthDate": "course:birthDate",
    "nationality": "course:nationality"
  },
  "@graph": [
    {
      "@id": "_:b0",
      "birthDate": "1978-02-21",
      "name": "Smith, Sandy",
      "nationality": "British"
    }
  ]
}
```
Thus, data passed to flattening may differ based on the context object that is applied.

### Summing up basic JSON-LD

JSON-LD can be structured in a number of ways depending on how the data has been processed; depending on the use case, data can be structured in ways that make the data verbose and leave underlying structure implicit in differing degrees.

In the remainder of the course, we will largely ignore expansion and flattening, and concentrate on using JSON-LD to structure data in a way that can be used easily with applications.

## Adding more features to the mix

JSON-LD is very powerful for application developers because it allows us to mark up data semantically so that it is unambiguous in a way JSON simply isn't. Adding this mark-up can make a mess of the JSON, and the data becomes largely incomprehensible or it can be marked up in a way that makes it easy to read without any real trade-off.

The element that adds the ability to make sense at the same time as not being awful to work with is the "@context" object, which we have already seen. Take a quick look again at the flattened graph without a @context object; this one is relatively simple, but more complex data structures become increasingly less easy to understand as a human. While some might say that this is not an issue, I'd argue that it is still a human working with the interface.

### @context as a tool for aliasing

Many people don't understand or care about the semantics, and maybe they shouldn't need to; some things about JSON-LD stick in their throats. Typically, it is the special "@" keys/values that people turn their noses up at possibly because:

```
  const type = object['@type']        // unaliased
  const type = object.type            // aliased
```

A simple step, which shows some of the functionality of the @context, can be to simply alias the "@" keys/values.

> [Example four: Aliasing](http://localhost:3211/json-ld.org/playground/#startTab=tab-compacted&json-ld=http%3A%2F%2Flocalhost%3A3211%2Fdocument%2Fa004.json&context=http%3A%2F%2Flocalhost%3A3211%2Fcontext%2Fa004.jsonld)

```
{
	"@context": {
		"uri": "@id",
		"type": "@type"
	},
	"uri": "http://localhost:3211/document/a001",
	"type": "http://localhost:3211/ontology#Document"
}
```

Here, I have aliased the @id to *uri* because that makes me feel more comfortable, because it is this that the JSON-LD document is describing. 

Adding more data to the structure, we can see some other features of this way of doing things. Let's expand the context with a few shorthands:

> [Example five: Aliasing](http://localhost:3211/json-ld.org/playground/#startTab=tab-compacted&json-ld=http%3A%2F%2Flocalhost%3A3211%2Fdocument%2Fa005.json&context=http%3A%2F%2Flocalhost%3A3211%2Fcontext%2Fa005.jsonld)

```
{
    "@context": {
        "uri": "@id",
        "type": "@type",
        "ontology": "http://localhost:3211/ontology#",
        "Document": "ontology:Document"
    },
    "uri": "http://localhost:3211/document/a001",
    "type": "Document" 
}
```
[Exercise 9: Aliasing](http://localhost:3211/json-ld.org/playground/#startTab=tab-compacted&json-ld=http%3A%2F%2Flocalhost%3A3211%2Fexercises%2Fe009)

### Datatypes

Notice that we added a @type, datatype for the object; datatypes can also be applied to values:

> [Example six: Datatypes](http://localhost:3211/json-ld.org/playground/#startTab=tab-compacted&json-ld=http%3A%2F%2Flocalhost%3A3211%2Fdocument%2Fa006)

```
{
    "@context": {
        "uri": "@id",
        "type": "@type",
        "ontology": "http://localhost:3211/ontology#",
        "Document": "ontology:Document",
        "title": "ontology:title"
    },
    "uri": "http://localhost:3211/document/a001",
    "type": "Document",
    "title": {
        "@value": "Peer Gynt",
        "@type": "http://www.w3.org/2001/XMLSchema#string"
    }
}
```

Here, we say that the title has a value "Peer Gynt" and the type of this is xsd:string, or rather we would if we had put xsd into the context…

> [Example seven: Datatypes](http://localhost:3211/json-ld.org/playground/#startTab=tab-expanded&json-ld=http%3A%2F%2Flocalhost%3A3211%2Fdocument%2Fa007)

```
{
    "@context": {
        "uri": "@id",
        "type": "@type",
        "ontology": "http://localhost:3211/ontology#",
        "Document": "ontology:Document",
        "title": "ontology:title",
        "xsd": "http://www.w3.org/2001/XMLSchema#"
    },
    "uri": "http://localhost:3211/document/a001",
    "type": "Document",
    "title": {
        "@value": "Peer Gynt",
        "@type": "xsd:string"
    }
}
```

There are a few things about this that are not very likeable; the whole "@value" and "@type" cluster, while practical from a regularity perspective is neither pretty nor necessary for most applications. Let's change this:

> [Example eight: Datatypes](http://localhost:3211/json-ld.org/playground/#startTab=tab-expanded&json-ld=http%3A%2F%2Flocalhost%3A3211%2Fdocument%2Fa008)

```
{
    "@context": {
        "uri": "@id",
        "type": "@type",
        "ontology": "http://localhost:3211/ontology#",
        "Document": "ontology:Document",
        "xsd": "http://www.w3.org/2001/XMLSchema#",
        "title": {
          "@id": "ontology:title",
          "@type": "xsd:string"
        }
    },
    "uri": "http://localhost:3211/document/a001",
    "type": "Document",
    "title": "Peer Gynt"
}
```

**NB!:** Using aliasing internally in the @context *usually* fails:

> [Example nine: Datatypes **(Fails)**](http://localhost:3211/json-ld.org/playground/#startTab=tab-expanded&json-ld=http%3A%2F%2Flocalhost%3A3211%2Fdocument%2Fa009)

```
{
    "@context": {
        "uri": "@id",
        "type": "@type",
        "ontology": "http://localhost:3211/ontology#",
        "Document": "ontology:Document",
        "xsd": "http://www.w3.org/2001/XMLSchema#",
        "title": {
          "uri": "ontology:title",
          "type": "xsd:string"
        }
    },
    "uri": "http://localhost:3211/document/a001",
    "type": "Document",
    "title": "Peer Gynt"
}
```

Adding other datatypes:

> [Example ten: Datatypes](http://localhost:3211/json-ld.org/playground/#startTab=tab-expanded&json-ld=http%3A%2F%2Flocalhost%3A3211%2Fdocument%2Fa010)

```
{
    "@context": {
        "uri": "@id",
        "type": "@type",
        "ontology": "http://localhost:3211/ontology#",
        "Document": "ontology:Document",
        "xsd": "http://www.w3.org/2001/XMLSchema#",
        "title": {
          "@id": "ontology:title",
          "@type": "xsd:string"
        },
        "firstPublished": {
            "@id": "ontology:firstPublished",
            "@type": "xsd:date"
        },
        "dbpediaPage": {
            "@id": "ontology:dbpediaPage",
            "@type": "@id"
        }
    },
    "uri": "http://localhost:3211/document/a001",
    "type": "Document",
    "title": "Peer Gynt",
    "firstPublished": "1867-11-14",
    "dbpediaPage": "http://dbpedia.org/resource/Peer_Gynt"
}
```

Note that any datatype that can be used in RDF can be used in JSON-LD; note also the special function of "@id" visible in the *expanded* view, setting the datatype of the URI as a reference (in JSON-LD-speak) or a URI-resource in RDF.

[Exercise 10: Yet more datatypes](http://localhost:3211/json-ld.org/playground/#startTab=tab-compacted&json-ld=http%3A%2F%2Flocalhost%3A3211%2Fexercises%2Fe010)

### Languages

JSON-LD supports internationalisation using [BCP47](https://tools.ietf.org/html/bcp47) tags:

[//]: # (SLIDE!!)

```
  "title": {
      "@value": "Peer Gynt",
      "@language": "en"
  }
```

Adding this to the main example, with a few variants shows that this is a bit untidy:

> [Example eleven: Languages](http://localhost:3211/json-ld.org/playground/#startTab=tab-expanded&json-ld=http%3A%2F%2Flocalhost%3A3211%2Fdocument%2Fa011)

```
{
    "@context": {
        "uri": "@id",
        "type": "@type",
        "ontology": "http://localhost:3211/ontology#",
        "Document": "ontology:Document",
        "xsd": "http://www.w3.org/2001/XMLSchema#",
        "title": {
            "@id": "ontology:title",
            "@type": "xsd:string"
        },
        "firstPublished": {
            "@id": "ontology:firstPublished",
            "@type": "xsd:date"
        },
        "dbpediaPage": {
            "@id": "ontology:dbpediaPage",
            "@type": "@id"
        }
    },
    "uri": "http://localhost:3211/document/a001",
    "type": "Document",
    "title": [{ 
        "@value": "Peer Gynt",
        "@language": "en"
    },
    {
        "@value": "Peer Gynt",
        "@language": "no"
    }, 
    {
        "@value": "Peer Gynt",
        "@language": "da"
    },     
    {
        "@value": "Πέερ Γκυντ",
        "@language": "el"
    },     
    {
        "@value": "Peer Gynt",
        "@language": "cs"
    },     
    {
        "@value": "Peer Gynt",
        "@language": "ca"
    },     
    {
        "@value": "Peer Gynt",
        "@language": "fi"
    },     
    {
        "@value": "Peer Gynt",
        "@language": "fr"
    },     
    {
        "@value": "Peer Gynt",
        "@language": "nl"
    },     
    {
        "@value": "Peer Gynt",
        "@language": "de"
    }],
    "firstPublished": "1867-11-14",
    "dbpediaPage": "http://dbpedia.org/resource/Peer_Gynt"
}
```

Let's tidy that up a bit, in the way [Manu Sporny suggests](https://www.youtube.com/watch?v=UmvWk_TQ30A):

> [Example twelve: Languages](http://localhost:3211/json-ld.org/playground/#startTab=tab-expanded&json-ld=http%3A%2F%2Flocalhost%3A3211%2Fdocument%2Fa012)

```
{
	"@context": {
		"uri": "@id",
		"type": "@type",
		"ontology": "http://localhost:3211/ontology#",
		"Document": "ontology:Document",
		"xsd": "http://www.w3.org/2001/XMLSchema#",
		"title": {
			"@id": "ontology:title",
			"@type": "xsd:string"
		},
		"firstPublished": {
			"@id": "ontology:firstPublished",
			"@type": "xsd:date"
		},
		"dbpediaPage": {
			"@id": "ontology:dbpediaPage",
			"@type": "@id"
		},
		"titleEn": {
			"@id": "ontology:titleEn",
			"@language": "en"
		},
		"titleNo": {
			"@id": "ontology:titleNo",
			"@language": "no"
		},
		"titleDa": {
			"@id": "ontology:titleDa",
			"@language": "da"
		},
		"titleEl": {
			"@id": "ontology:titleEl",
			"@language": "el"
		},
		"titleCs": {
			"@id": "ontology:titleCs",
			"@language": "cs"
		},
		"titleCa": {
			"@id": "ontology:titleCa",
			"@language": "ca"
		},
		"titleFi": {
			"@id": "ontology:titleFi",
			"@language": "fi"
		},
		"titleFr": {
			"@id": "ontology:titleFr",
			"@language": "fr"
		}
	},
	"uri": "http://localhost:3211/document/a001",
	"type": "Document",
	"titleEn": "Peer Gynt",
	"titleNo": "Peer Gynt",
	"titleDa": "Peer Gynt",
	"titleEl": "Πέερ Γκυντ",
	"titleCs": "Peer Gynt",
	"titleCa": "Peer Gynt",
	"titleFi": "Peer Gynt",
	"titleFr": "Peer Gynt",
	"titleNl": "Peer Gynt",
	"titleDe": "Peer Gynt",
	"firstPublished": "1867-11-14",
	"dbpediaPage": "http://dbpedia.org/resource/Peer_Gynt"
}
```
However, I guess I prefer the [language map](https://json-ld.org/spec/latest/json-ld-api/#dfn-language-map) behaviour:

> [Example thirteen: Languages](http://localhost:3211/json-ld.org/playground/#startTab=tab-expanded&json-ld=http%3A%2F%2Flocalhost%3A3211%2Fdocument%2Fa013)

```
{
	"@context": {
		"uri": "@id",
		"type": "@type",
		"ontology": "http://localhost:3211/ontology#",
		"Document": "ontology:Document",
		"xsd": "http://www.w3.org/2001/XMLSchema#",
		"firstPublished": {
			"@id": "ontology:firstPublished",
			"@type": "xsd:date"
		},
		"dbpediaPage": {
			"@id": "ontology:dbpediaPage",
			"@type": "@id"
		},
		"title": {
			"@id": "ontology:title",
			"@container": "@language"
		}
	},
	"uri": "http://localhost:3211/document/a001",
	"type": "Document",
	"title": {
		"en": "Peer Gynt",
		"no": "Peer Gynt",
		"da": "Peer Gynt",
		"el": "Πέερ Γκυντ",
		"cs": "Peer Gynt",
		"ca": "Peer Gynt",
		"fi": "Peer Gynt",
		"fr": "Peer Gynt",
		"nl": "Peer Gynt",
		"de": "Peer Gynt"
	},
	"firstPublished": "1867-11-14",
	"dbpediaPage": "http://dbpedia.org/resource/Peer_Gynt"
}
```

[Exercise 11: Language maps](http://localhost:3211/json-ld.org/playground/#startTab=tab-compacted&json-ld=http%3A%2F%2Flocalhost%3A3211%2Fexercises%2Fe011)

### Embedding resources

Continuing with our example, let's take a look at another resource:

> [Example fourteen A: Embedding resources](http://localhost:3211/json-ld.org/playground/#startTab=tab-compacted&json-ld=http%3A%2F%2Flocalhost%3A3211%2Fperson%2Fp001)

```
{
	"@context": {
		"uri": "@id",
		"type": "@type",
		"ontology": "http://localhost:3211/ontology#",
		"xsd": "http://www.w3.org/2001/XMLSchema#",
		"name": {
			"@id": "ontology:name",
			"@container": "@language"
		},
		"birthDate": {
			"@type": "xsd:date",
			"@id": "ontology:birthDate"
		},
		"deathDate": {
			"@type": "xsd:date",
			"@id": "ontology:deathDate"
		}
	},
	"uri": "http://localhost:3211/person/a0014",
	"name": {
		"en": "Henrik Ibsen",
		"no": "Henrik Ibsen",
		"da": "Henrik Ibsen",
		"el": "Ερρίκος Ίψεν",
		"cs": "Henrik Ibsen",
		"ca": "Henrik Ibsen",
		"fi": "Henrik Ibsen",
		"fr": "Henrik Ibsen",
		"nl": "Henrik Ibsen",
		"de": "Henrik Ibsen"
	},
	"birthDate": "1828-03-20",
	"deathDate": "1906-05-23"
}
```
We can reference this resource in our existing resource:

> [Example fourteen B: embedding resources](http://localhost:3211/json-ld.org/playground/#startTab=tab-expanded&json-ld=http%3A%2F%2Flocalhost%3A3211%2Fdocument%2Fa014)

```
{
	"@context": {
		"uri": "@id",
		"type": "@type",
		"ontology": "http://localhost:3211/ontology#",
		"Document": "ontology:Document",
		"xsd": "http://www.w3.org/2001/XMLSchema#",
		"firstPublished": {
			"@id": "ontology:firstPublished",
			"@type": "xsd:date"
		},
		"dbpediaPage": {
			"@id": "ontology:dbpediaPage",
			"@type": "@id"
		},
		"title": {
			"@id": "ontology:title",
			"@container": "@language"
		},
		"contributor": {
			"@id": "ontology:contributor",
			"@type": "@id"
		}
	},
	"uri": "http://localhost:3211/document/a001",
	"type": "Document",
	"title": {
		"en": "Peer Gynt",
		"no": "Peer Gynt",
		"da": "Peer Gynt",
		"el": "Πέερ Γκυντ",
		"cs": "Peer Gynt",
		"ca": "Peer Gynt",
		"fi": "Peer Gynt",
		"fr": "Peer Gynt",
		"nl": "Peer Gynt",
		"de": "Peer Gynt"
	},
	"firstPublished": "1867-11-14",
	"dbpediaPage": "http://dbpedia.org/resource/Peer_Gynt",
	"contributor": "http://localhost:3211/person/p001"
}
```
We could put everything into one graph:

> [Example fifteen: embedding resources](http://localhost:3211/json-ld.org/playground/#startTab=tab-expanded&json-ld=http%3A%2F%2Flocalhost%3A3211%2Fdocument%2Fa015)

```
{
	"@context": {
		"uri": "@id",
		"type": "@type",
		"graph": "@graph",
		"ontology": "http://localhost:3211/ontology#",
		"Document": "ontology:Document",
		"xsd": "http://www.w3.org/2001/XMLSchema#",
		"firstPublished": {
			"@id": "ontology:firstPublished",
			"@type": "xsd:date"
		},
		"dbpediaPage": {
			"@id": "ontology:dbpediaPage",
			"@type": "@id"
		},
		"title": {
			"@id": "ontology:title",
			"@container": "@language"
		},
		"contributor": {
			"@id": "ontology:contributor",
			"@type": "@id"
		},
		"name": {
			"@id": "ontology:name",
			"@container": "@language"
		},
		"birthDate": {
			"@type": "xsd:date",
			"@id": "ontology:birthDate"
		},
		"deathDate": {
			"@type": "xsd:date",
			"@id": "ontology:deathDate"
		}
	},
	"graph": [{
			"uri": "http://localhost:3211/document/a001",
			"type": "Document",
			"title": {
				"en": "Peer Gynt",
				"no": "Peer Gynt",
				"da": "Peer Gynt",
				"el": "Πέερ Γκυντ",
				"cs": "Peer Gynt",
				"ca": "Peer Gynt",
				"fi": "Peer Gynt",
				"fr": "Peer Gynt",
				"nl": "Peer Gynt",
				"de": "Peer Gynt"
			},
			"firstPublished": "1867-11-14",
			"dbpediaPage": "http://dbpedia.org/resource/Peer_Gynt",
			"contributor": "http://localhost:3211/person/p001"
		},
		{
			"uri": "http://localhost:3211/person/p001",
			"name": {
				"en": "Henrik Ibsen",
				"no": "Henrik Ibsen",
				"da": "Henrik Ibsen",
				"el": "Ερρίκος Ίψεν",
				"cs": "Henrik Ibsen",
				"ca": "Henrik Ibsen",
				"fi": "Henrik Ibsen",
				"fr": "Henrik Ibsen",
				"nl": "Henrik Ibsen",
				"de": "Henrik Ibsen"
			},
			"birthDate": "1828-03-20",
			"deathDate": "1906-05-23"
		}
	]
}
```

Or we can embed it:

> [Example sixteen: embedding resources](http://localhost:3211/json-ld.org/playground/#startTab=tab-expanded&json-ld=http%3A%2F%2Flocalhost%3A3211%2Fdocument%2Fa016)

```
{
	"@context": {
		"uri": "@id",
		"type": "@type",
		"ontology": "http://localhost:3211/ontology#",
		"Document": "ontology:Document",
		"xsd": "http://www.w3.org/2001/XMLSchema#",
		"firstPublished": {
			"@id": "ontology:firstPublished",
			"@type": "xsd:date"
		},
		"dbpediaPage": {
			"@id": "ontology:dbpediaPage",
			"@type": "@id"
		},
		"title": {
			"@id": "ontology:title",
			"@container": "@language"
		},
		"contributor": {
			"@id": "ontology:contributor",
			"@type": "@id"
		},
		"name": {
			"@id": "ontology:name",
			"@container": "@language"
		},
		"birthDate": {
			"@type": "xsd:date",
			"@id": "ontology:birthDate"
		},
		"deathDate": {
			"@type": "xsd:date",
			"@id": "ontology:deathDate"
		}
	},
	"uri": "http://localhost:3211/document/a001",
	"type": "Document",
	"title": {
		"en": "Peer Gynt",
		"no": "Peer Gynt",
		"da": "Peer Gynt",
		"el": "Πέερ Γκυντ",
		"cs": "Peer Gynt",
		"ca": "Peer Gynt",
		"fi": "Peer Gynt",
		"fr": "Peer Gynt",
		"nl": "Peer Gynt",
		"de": "Peer Gynt"
	},
	"firstPublished": "1867-11-14",
	"dbpediaPage": "http://dbpedia.org/resource/Peer_Gynt",
	"contributor": {
		"uri": "http://localhost:3211/person/p001",
		"name": {
			"en": "Henrik Ibsen",
			"no": "Henrik Ibsen",
			"da": "Henrik Ibsen",
			"el": "Ερρίκος Ίψεν",
			"cs": "Henrik Ibsen",
			"ca": "Henrik Ibsen",
			"fi": "Henrik Ibsen",
			"fr": "Henrik Ibsen",
			"nl": "Henrik Ibsen",
			"de": "Henrik Ibsen"
		},
		"birthDate": "1828-03-20",
		"deathDate": "1906-05-23"
	}
}
```

> What happens if a references b, which references a?

## Framing

Framing allows us to force specific tree layouts on a JSON-LD **document**.

It's worth remembering that a serialised JSON-LD document can be structured in many different ways and still be valid. In order for JSON-LD to be usable for developers, there needs to be a simple way to force a deterministic layout for the graph.

Put simply, JSON-LD Framing is an effective way of manipulating the JSON-LD that other APIs deliver so that it works for your purposes. This means that the JSON you end up working can be structured in an optimal way for what you are trying to do by applying a frame.

### First step, creating a frame

We have a document that contains a graph that contains five nodes, one that is a Concept and four that are simply terms that are sometimes used (this is modelled to some extent after a simplified MeSH):

> [Example: simple frame document (no frame)](http://localhost:3211/json-ld.org/playground/#startTab=tab-framed&json-ld=http%3A%2F%2Flocalhost%3A3211%2Fdocument%2Fa017)

```
{
	"@graph": [{
			"@id": "http://example.org/concept/Fish",
			"@type": "http://example.org/ontology#Concept",
			"http://example.org/ontology#label": "Fish",
			"http://example.org/ontology#nonPreferredTerm": [{
					"@id": "http://example.org/term/Fishie"
				},
				{
					"@id": "http://example.org/term/Poisson"
				},
				{
					"@id": "http://example.org/term/Fisch"
				},
				{
					"@id": "http://example.org/term/Fisk"
				}
			]
		},
		{
			"@id": "http://example.org/term/Fishie",
			"@type": "http://example.org/ontology#Term",
			"http://example.org/ontology#label": "Fishie"

		},
		{
			"@id": "http://example.org/term/Poisson",
			"@type": "http://example.org/ontology#Term",
			"http://example.org/ontology#label": "Poisson"

		},
		{
			"@id": "http://example.org/term/Fisch",
			"@type": "http://example.org/ontology#Term",
			"http://example.org/ontology#label": "Fisch"

		},
		{
			"@id": "http://example.org/term/Fisk",
			"@type": "http://example.org/ontology#Term",
			"http://example.org/ontology#label": "Fisk"

		}
	]
}
```

This looks a lot like a mess, so what can we do to clean it up?

Note that I have been very careful about giving all of my nodes a **@type**. This can help us. I want to restructure this so that my document is easier to work with; I suspect that the entry point for my restructured document tree should look something like this:

```
- Concept
     |
     |
     - Terms
```
This means I can say ```const terms = concept.terms```, when I want to access the data, but how do I get there?

Let's apply the simplest frame of all.

> [Example: simple frame](http://localhost:3211/json-ld.org/playground/#startTab=tab-framed&json-ld=http%3A%2F%2Flocalhost%3A3211%2Fdocument%2Fa017&frame=http%3A%2F%2Flocalhost%3A3211%2Fcontext%2Fa017.jsonld)

```
{
  "@context": {
    "@vocab": "http://example.org/ontology#",
    "uri": "@id"
  },
  "@type": "Concept"
}
```
Pausing for just a moment, it's worth noting the structure here; we have a **@context** that contains the usual things, and then we have the magic ```"@type": "Concept"```, which is the frame. Note that you will be getting confused when you work with these things because a lot of times we refer to the same key in the **@context** and the frame — you will end up getting frustrated because you've edited the wrong thing. Accept it now; know that this is a common error and things will be much better.

This frame produces a new document that is restructured like we had imagined:

```
{
  "@context": {
    "@vocab": "http://example.org/ontology#",
    "uri": "@id",
    "graph": "@graph",
    "type": "@type"
  },
  "graph": [
    {
      "uri": "http://example.org/concept/Fish",
      "type": "Concept",
      "label": "Fish",
      "nonPreferredTerm": [
        {
          "uri": "http://example.org/term/Fishie",
          "type": "Term",
          "label": "Fishie"
        },
        {
          "uri": "http://example.org/term/Poisson",
          "type": "Term",
          "label": "Poisson"
        },
        {
          "uri": "http://example.org/term/Fisch",
          "type": "Term",
          "label": "Fisch"
        },
        {
          "uri": "http://example.org/term/Fisk",
          "type": "Term",
          "label": "Fisk"
        }
      ]
    }
  ]
}
```

That was quite successful, I can now request every label in the document by selecting

[//]: # (SLIDE!!)

```document.graph.nonPreferredTerm[index].label```.

This behaviour seems to indicate that the framing algorithm attempts to embedd nodes by default. We will look at embedding in detail in  a moment.

[Exercise 12: Framing](http://localhost:3211/json-ld.org/playground/#startTab=tab-framed&json-ld=http%3A%2F%2Flocalhost%3A3211%2Fexercises%2Fe012)

### What does the framing algorithm actually do?

>The Framing Algorithm […] first [expands] both the input frame and document. It then creates a map of flattened subjects. The outer-most node object within the frame is used to match objects in the map, in this case looking for node objects which have an @type of [Concept], and a contains property with another frame used to match values of that property. The input document contains exactly one such node object. The value of contains also has a node object, which is then treated as a frame to match the set of subjects which are contains values of the [Concept] object…

[JSON-LD Framing 1.1](https://json-ld.org/spec/latest/json-ld-framing/)

### @default: taking things not being there into account

Let's say we have the following data:

> [Example: Default (no frame)](http://localhost:3211/json-ld.org/playground/#startTab=tab-framed&json-ld=http%3A%2F%2Flocalhost%3A3211%2Fdocument%2Fa018)

```
{
	"@context": {
		"@vocab": "http://example.org/ontology#"
	},
	"@graph": [{
			"@id": "http://example.org/item/a0001",
			"@type": "Item",
			"title": "About a boy",
			"description": "A film about a boy"
		},
		{
			"@id": "http://example.org/item/a0002",
			"@type": "Item",
			"title": "The hobbit"
		},
		{
			"@id": "http://example.org/sale/a0001",
			"@type": "SaleItem",
			"saleItems": [{
					"@id": "http://example.org/item/a0001"
				},
				{
					"@id": "http://example.org/item/a0002"
				}
			]
		}
	]
}
```

And we'd like to make sure that the data is structured so that we can get each sale item in a way similar to the previous example; in this case, we also want to ensure that the data is uniformly structured and as some information is missing, we want to add that back in:

> [Example: framed](http://localhost:3211/json-ld.org/playground/#startTab=tab-framed&json-ld=http%3A%2F%2Flocalhost%3A3211%2Fdocument%2Fa018&frame=http%3A%2F%2Flocalhost%3A3211%2Fcontext%2Fa018.jsonld)

```
{
	"@context": {
		"@vocab": "http://example.org/ontology#",
		"type": "@type",
		"graph": "@graph",
		"uri": "@id"
	},
	"type": "SaleItem",
	"saleItems": {
		"type": "Item",
		"description": {
			"@default": "No description available"
		}
	}
}
```
The **@default** term provides us with a way of giving the description a default value (in reality, this might be ```null```).

The result:

```
{
	"@context": {
		"@vocab": "http://example.org/ontology#",
		"type": "@type",
		"graph": "@graph",
		"uri": "@id"
	},
	"graph": [{
		"uri": "http://example.org/sale/a0001",
		"type": "SaleItem",
		"saleItems": [{
				"uri": "http://example.org/item/a0001",
				"type": "Item",
				"description": "A film about a boy",
				"title": "About a boy"
			},
			{
				"uri": "http://example.org/item/a0002",
				"type": "Item",
				"description": "No description available",
				"title": "The hobbit"
			}
		]
	}]
}
```
### Controlling embedding

Let's take a look at the previous example, but use a new frame:

> [Example: Embedding in frames](http://localhost:3211/json-ld.org/playground/#startTab=tab-framed&json-ld=http%3A%2F%2Flocalhost%3A3211%2Fdocument%2Fa019&frame=http%3A%2F%2Flocalhost%3A3211%2Fcontext%2Fa019.jsonld)

```
{
	"@context": {
		"@vocab": "http://example.org/ontology#",
		"type": "@type",
		"graph": "@graph",
		"uri": "@id"
	},
	"type": "SaleItem",
	"saleItems": {
		"type": "Item",
		"@embed":"@never"
	}
}
```
The result looks like this:

```
{
  "@context": {
    "@vocab": "http://example.org/ontology#",
    "type": "@type",
    "graph": "@graph",
    "uri": "@id"
  },
  "graph": [
    {
      "uri": "http://example.org/sale/a0001",
      "type": "SaleItem",
      "saleItems": [
        {
          "uri": "http://example.org/item/a0001"
        },
        {
          "uri": "http://example.org/item/a0002"
        }
      ]
    }
  ]
}
```
Using ```"@embed": "@never"``` causes the node object to be omitted, in its place, there is a reference. This can be useful in contexts where the data is loaded asyncronously.

We can also use ```"@embed": "@last"``, the following example demonstrates some of the functionality. We have a series of three books by Knausgaard, 

> [Example: unframed](http://localhost:3211/json-ld.org/playground/#startTab=tab-framed&json-ld=http%3A%2F%2Flocalhost%3A3211%2Fdocument%2Fa020)

```
{
  "@context": {
    "@vocab": "http://example.org/ontology#",
    "@base": "http://example.org/example/"
  },
  "@graph": [
    {
      "@id": "book1",
      "@type": "Book",
      "title": "My Struggle: Book 1",
      "contributor": {
        "@id": "Knausgaard"
      },
      "illustrator": {
        "@id": "Knausgaard"
      }
    },
    {
      "@id": "book2",
      "@type": "Book",
      "title": "My Struggle: Book 2",
      "contributor": {
        "@id": "Knausgaard"
      },
      "illustrator": {
        "@id": "Knausgaard"
      }
    },
    {
      "@id": "book3",
      "@type": "Book",
      "title": "My Struggle: Book 3",
      "contributor": {
        "@id": "Knausgaard"
      },
      "illustrator": {
        "@id": "Knausgaard"
      }
    },
    {
      "@id": "Knausgaard",
      "name": "Knausgaard, Karl Ove"
    }
  ]
}
```

Using the following frame, we can see how ```"@embed": "@last"``` affects only node-internal embedding, not graph-wide embedding.

> [Example: embedding with @last](http://localhost:3211/json-ld.org/playground/#startTab=tab-framed&json-ld=http%3A%2F%2Flocalhost%3A3211%2Fdocument%2Fa020&frame=http%3A%2F%2Flocalhost%3A3211%2Fcontext%2Fa020.jsonld)

```
{
  "@context": {
    "@vocab": "http://example.org/ontology#"
  },
  "@embed": "@last",
  "@type": "Book"
}
```
Because Knausgaard is both contributor and illustrator for the book, the two references occur in the same node. As a consequence, we see that only one is embedded in each node:

```
{
  "@context": {
    "@vocab": "http://example.org/ontology#"
  },
  "@graph": [
    {
      "@id": "http://example.org/example/book1",
      "@type": "Book",
      "contributor": {
        "@id": "http://example.org/example/Knausgaard"
      },
      "illustrator": {
        "@id": "http://example.org/example/Knausgaard",
        "name": "Knausgaard, Karl Ove"
      },
      "title": "My Struggle: Book 1"
    },
    {
      "@id": "http://example.org/example/book2",
      "@type": "Book",
      "contributor": {
        "@id": "http://example.org/example/Knausgaard"
      },
      "illustrator": {
        "@id": "http://example.org/example/Knausgaard",
        "name": "Knausgaard, Karl Ove"
      },
      "title": "My Struggle: Book 2"
    },
    {
      "@id": "http://example.org/example/book3",
      "@type": "Book",
      "contributor": {
        "@id": "http://example.org/example/Knausgaard"
      },
      "illustrator": {
        "@id": "http://example.org/example/Knausgaard",
        "name": "Knausgaard, Karl Ove"
      },
      "title": "My Struggle: Book 3"
    }
  ]
}
```
Contrast this with the same, where the flag is set to "@always":

> [Example: Embedding with @always](http://localhost:3211/json-ld.org/playground/#startTab=tab-framed&json-ld=http%3A%2F%2Flocalhost%3A3211%2Fdocument%2Fa021&frame=http%3A%2F%2Flocalhost%3A3211%2Fcontext%2Fa021.jsonld)

```
{
  "@context": {
    "@vocab": "http://example.org/ontology#"
  },
  "@graph": [
    {
      "@id": "http://example.org/example/book1",
      "@type": "Book",
      "contributor": {
        "@id": "http://example.org/example/Knausgaard",
        "name": "Knausgaard, Karl Ove"
      },
      "illustrator": {
        "@id": "http://example.org/example/Knausgaard",
        "name": "Knausgaard, Karl Ove"
      },
      "title": "My Struggle: Book 1"
    },
    {
      "@id": "http://example.org/example/book2",
      "@type": "Book",
      "contributor": {
        "@id": "http://example.org/example/Knausgaard",
        "name": "Knausgaard, Karl Ove"
      },
      "illustrator": {
        "@id": "http://example.org/example/Knausgaard",
        "name": "Knausgaard, Karl Ove"
      },
      "title": "My Struggle: Book 2"
    },
    {
      "@id": "http://example.org/example/book3",
      "@type": "Book",
      "contributor": {
        "@id": "http://example.org/example/Knausgaard",
        "name": "Knausgaard, Karl Ove"
      },
      "illustrator": {
        "@id": "http://example.org/example/Knausgaard",
        "name": "Knausgaard, Karl Ove"
      },
      "title": "My Struggle: Book 3"
    }
  ]
}
```
And finally, never:

```
{
  "@context": {
    "@vocab": "http://example.org/ontology#"
  },
  "@graph": [
    {
      "@id": "http://example.org/example/book1"
    },
    {
      "@id": "http://example.org/example/book2"
    },
    {
      "@id": "http://example.org/example/book3"
    }
  ]
}
```

If we alter the frame, we can get the expected result:

```
{
  "@context": {
    "@vocab": "http://example.org/ontology#"
  },
  "contributor": {
    "@embed": "@never"
  },
  "illustrator": {
    "@embed": "@never"
  }
}
```
```
{
  "@context": {
    "@vocab": "http://example.org/ontology#"
  },
  "@graph": [
    {
      "@id": "http://example.org/example/book1",
      "@type": "Book",
      "contributor": {
        "@id": "http://example.org/example/Knausgaard"
      },
      "illustrator": {
        "@id": "http://example.org/example/Knausgaard"
      },
      "title": "My Struggle: Book 1"
    },
    {
      "@id": "http://example.org/example/book2",
      "@type": "Book",
      "contributor": {
        "@id": "http://example.org/example/Knausgaard"
      },
      "illustrator": {
        "@id": "http://example.org/example/Knausgaard"
      },
      "title": "My Struggle: Book 2"
    },
    {
      "@id": "http://example.org/example/book3",
      "@type": "Book",
      "contributor": {
        "@id": "http://example.org/example/Knausgaard"
      },
      "illustrator": {
        "@id": "http://example.org/example/Knausgaard"
      },
      "title": "My Struggle: Book 3"
    }
  ]
}
```

There is a final term that can be used with **@embed**, **@link**, which is defined in the following way:

> In the in-memory internal representation, nodes are linked directly, which allows for circular references. 

[JSON-LD Framing 1.1](https://json-ld.org/spec/latest/json-ld-framing)

The effect that this has is not apparent outside the processor (c.f. question above about a -> b -> a, circular relationships).

How embedding works by default is controlled by passing an **embed** flag the JSON-LD processor

[Exercise 13: Embedding](http://localhost:3211/json-ld.org/playground/#startTab=tab-framed&json-ld=http%3A%2F%2Flocalhost%3A3211%2Fexercises%2Fe013)

### @explicit: controlling what is shown

Other times, it is relevant to show only some of the data, for example, a very full description of an item is not necessary for a search preview, so the data can be reduced:

```
{
  "@context": {
    "@vocab": "http://example.org/ontology#"
  },
  "@graph": [
    {
      "@id": "http://example.org/item/a0001",
      "@type": "Item",
      "title": "About a boy",
      "description": "A film about a boy",
      "something": "blah, blah",
      "somethingElse": "blah, blah, blah"
    },
    {
      "@id": "http://example.org/item/a0002",
      "@type": "Item",
      "title": "The hobbit",
      "yetAnotherThing": "blah, blah",
      "creator": "Tolkein, J. R. R."
    }
 ]
}
```
To get rid of the information we don't want, we can apply a frame of the following kind:

```
{
	"@context": {
		"@vocab": "http://example.org/ontology#",
		"graph": "@graph",
		"uri": "@id"
	},
	"@type": "Item",
    "title": {},
    "creator": {},
    "@explicit": true
}
```
Here we have done two things, one, we have specified the things we really want in the frame (type, title, creator) and secondly, we have said ```"@xplicit": true```, which ensures that only the things we have explicitly said to include are there.

```
{
  "@context": {
    "@vocab": "http://example.org/ontology#",
    "graph": "@graph",
    "uri": "@id"
  },
  "graph": [
    {
      "uri": "http://example.org/item/a0001",
      "@type": "Item",
      "creator": null,
      "title": "About a boy"
    },
    {
      "uri": "http://example.org/item/a0002",
      "@type": "Item",
      "creator": "Tolkein, J. R. R.",
      "title": "The hobbit"
    }
  ]
}
```
Note: This behaviour can also be set by passing the **explicit** option to the JSON-LD processor.

### @omitDefault

Using the previous frame has one unfortunate consequence, a ```null``` value has crept in because we have no creator for the film. This can be remedied by adjusting the frame, using the **@omitDefault** term:

```
{
	"@context": {
		"@vocab": "http://example.org/ontology#",
		"graph": "@graph",
		"uri": "@id"
	},
  "@omitDefault": true,
	"@type": "Item",
    "title": {},
    "creator": {"@omitDefault": true},
    "@explicit": true
}
```

**NB:** the same can be achieved by passing the **omitDefault** flag to the JSON-LD processor.

The result:

```
{
  "@context": {
    "@vocab": "http://example.org/ontology#",
    "graph": "@graph",
    "uri": "@id"
  },
  "graph": [
    {
      "uri": "http://example.org/item/a0001",
      "@type": "Item",
      "title": "About a boy"
    },
    {
      "uri": "http://example.org/item/a0002",
      "@type": "Item",
      "creator": "Tolkein, J. R. R.",
      "title": "The hobbit"
    }
  ]
}
```

[Exercise 14: More embedding](http://localhost:3211/json-ld.org/playground/#startTab=tab-framed&json-ld=http%3A%2F%2Flocalhost%3A3211%2Fexercises%2Fe014)


## Odd things that go wrong

* Accidentally having the same key several places produces weird results
* Confusing the **@context** with the frame

[Exercise 15: The whole shebang](http://localhost:3211/json-ld.org/playground/#startTab=tab-framed&json-ld=http%3A%2F%2Flocalhost%3A3211%2Fexercises%2Fe015)

## Programming with JSON-LD

### State of the art.

#### C&#35;

Originally an autoport of JSON-LD-JAVA. Complete?

* [https://github.com/NuGet/json-ld.net](https://github.com/NuGet/json-ld.net)

#### Go

Full support for JSON-LD spec. 

[https://github.com/kazarena/json-gold](https://github.com/kazarena/json-gold)

#### Javascript

Probably the best choice currently, anecdotally, it is faster to have a node.js service instead of processing JSON-LD in certain other languages (I'm unconvinced, but I relay this experience as it is from someone I respect).

* [https://github.com/digitalbazaar/jsonld.js/](https://github.com/digitalbazaar/jsonld.js/)

#### Java

Support for all aspects of JSON-LD processing, some discrepancies between handing in Java and Javascript, some small features not present.

* [https://github.com/jsonld-java/jsonld-java](https://github.com/jsonld-java/jsonld-java)

#### Perl

Abandoned, somewhat complete projects.

* [https://github.com/frezik/JSON-LD](https://github.com/frezik/JSON-LD) seems to be the most complete, but I have not tested it.
* Catmandu?

**Advice:** avoid processing JSON-LD in Perl, treat it like JSON; if you need to process JSON-LD, do it in a separate service in another language or contribute to the maintenance/creation of a suitable library.

#### PHP

Complete support for JSON-LD specs, written by Marcus Lanthaler.

* [https://github.com/lanthaler/JsonLD](https://github.com/lanthaler/JsonLD)

#### Python

Two choices, complete?

* [https://github.com/digitalbazaar/pyld](https://github.com/digitalbazaar/pyld)
* [https://github.com/lanthaler/JsonLD](https://github.com/lanthaler/JsonLD)

#### Ruby

Support for all aspects of JSON-LD.

* [https://github.com/ruby-rdf/json-ld/](https://github.com/ruby-rdf/json-ld/)

## Performance

JSON-LD performance out-of-the-box is [apparently very bad](http://www.dr-chuck.com/csev-blog/2016/04/json-ld-performance-sucks-for-api-specs/). In fact, we have never experienced any performance issues really, probably because we aren't doing anything that requires performance near to real time or in high volume. 

In practice, performance depends in large part on which libraries you are using and what the data is that you're processing.

If you want the best possible performance, a few simple things can be done.

### Context caching

Caching the context object reduces JSON-LD processing times drastically, this is an issue [discussed at length by Manu Sporny](http://manu.sporny.org/2016/json-ld-context-caching/).

* [JSON-LD context-caching node library](https://www.npmjs.com/package/json-ld-context-cache)

## Readings

### JSON
json.org. nd. [Introducing JSON](http://www.json.org/). Accessed 2017-03-05.

Bray, Tim. 2014. [JSON Redux AKA RFC7159](https://www.tbray.org/ongoing/When/201x/2014/03/05/RFC7159-JSON). Accessed 2017-03-05.

### JSON specifications
IETF. 2014. [RFC7159 The JavaScript Object Notation (JSON) Data Interchange Format](https://tools.ietf.org/html/rfc7159). Accessed 2017-03-05.

ECMA. 2013. [ECMA-404: The JSON Data Interchange Format](https://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). Accessed 2017-03-05.

### JSON-LD

W3C. 2017. [JSON-LD 1.1: A JSON-based Serialization for Linked Data](http://json-ld.org/spec/latest/json-ld/). Accessed 2017-03-05.

W3C. 2014. [JSON-LD 1.0 Processing Algorithms and API](https://www.w3.org/TR/json-ld-api/). Accessed 2017-05-21.

Sporny, Manu. 2014. [JSON-LD and Why I Hate the Semantic Web](http://manu.sporny.org/2014/json-ld-origins-2/). Accessed 2017-05-20.

Sporny, Manu. 2016. [JSON-LD context caching](http://manu.sporny.org/2016/json-ld-context-caching/). Accessed (via Wayback Machine): 2017-05-30.

W3C. 2017. [JSON-LD Framing 1.1](https://json-ld.org/spec/latest/json-ld-framing/). Accessed 2017-06-03.

### JSON Schema

JSON-Schema.org nd. [JSON Schema](http://json-schema.org/). Accessed 2017-05-19.

Newtonsoft. 2017. [JSON Schema validator] (http://www.jsonschemavalidator.net/). Accessed 2017-05-19.