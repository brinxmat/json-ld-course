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

##What is JSON-LD?

##What is JSON?

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
### Issues with the JSON format

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

* a graph data model in JSON
* somewhat compatible with RDF
* JSON
* a format for linked data on the Web

## Javascript Object Notation for Linking Data

Note that the name JSON-LD is not "linked data", but "for linking data". Linked data is — whether we like it or not — closely tied to RDF and the traditional semantic web, even though this is not necessarily entailed by the term (RDF is simply a *best practice recommendation* in Berners-Lee's [Five star linked data concept](https://www.w3.org/DesignIssues/LinkedData.html)). 

JSON-LD provides a packaging for data that allows us to use linked data in a simple way that will not get in the way for users who are not interested in the semantics of the terms, but just want quick-and-dirty access to the data. This means for most native JSON-LD that little tooling is required beyond the standard JSON parser, which means that developers don't need to care about or understand the Semantic Web to use the data.

## Should *we* care about RDF?

Library data is the kind of data that is typically well suited to representations in graphs, and it has been demonstrated that semantic technologies can be used to good effect in bibliographic description. 

I'd argue that RDF provides a good way of describing our data and that this is something that we should continue to explore. At Oslo public library, RDF has provided a simple, extensible framework that can be used for all material types and provides access to data and flexible options for working with that data.

Nevertheless, getting data from such a utilitarian data model to a suitable display format without having to do silly things (display strings in the data) isn't always easy.

JSON-LD's compatibility with RDF provides a solution to several of the problems perceived by front-end developers who are unfamiliar with RDF — at the same time as providing direct support for linked data. This is a win-win.

Those that want to use RDF, SPARQL and the Semantic Web stack can, those that want to use document stores can and those that produce data from other sources can mark up data from their APIs to make them "semantic" in a quick and simple way.

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

> Example: [Exercise one: Adding context](http://localhost:3211/json-ld.org/playground/#startTab=tab-expanded&json-ld=http%3A%2F%2Flocalhost%3A3211%2Fdocument%2Fa001)

```
{
    "@context": "http://localhost:3211/context/a001.jsonld",
    "name": "Smith, Sandy",
    "birthDate": "1978-02-21",
    "nationality": "British"
}
```
Here we simply add a "@context" to the JSON, think of "@context" in the same way you would if someone talked about a context for a discussion — a way of making it clear what we're talking about and thereby how to interpret the terms that are used. Thus, we are not talking about "name", "birthDate" and "nationality" in general terms, we are talking about them in specific terms — the terms defined by the context.

Looking at the data on the different tabs, we notice that the context has been applied, so that *name* is now equivalent to *http://localhost:3211/context/a001#name*.

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

> Example: [Exercise 2: Adding context](http://localhost:3211/json-ld.org/playground/#startTab=tab-expanded&json-ld=http%3A%2F%2Flocalhost%3A3211%2Fdocument%2Fa002)

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

### Different representations of JSON-LD

Note that there are several possible representations of this data in JSON-LD, these are provided by processing the data with the JSON-LD API algorithms:

* [expansion](https://www.w3.org/TR/json-ld-api/#expansion)
* [compaction](https://www.w3.org/TR/json-ld-api/#compaction)
* [flattening](https://www.w3.org/TR/json-ld-api/#flattening)

The first of these, expansion, *expands* the property references and removes the context object from the JSON. For example:

> Example [Exercise two: Adding context (Expanded)](http://localhost:3211/json-ld.org/playground/#startTab=tab-expanded&json-ld=http%3A%2F%2Flocalhost%3A3211%2Fdocument%2Fa002)

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

> Example [Exercise two: Adding context (Compacted)](http://localhost:3211/json-ld.org/playground/#startTab=tab-compacted&json-ld=http%3A%2F%2Flocalhost%3A3211%2Fdocument%2Fa002)

```
{
  "http://localhost:3211/ontology#birthDate": "1978-02-21",
  "http://localhost:3211/ontology#name": "Smith, Sandy",
  "http://localhost:3211/ontology#nationality": "British"
}
```
Supplying a context makes it possible to compact the properties to terms and makes the data easier to work with in most programming jobs.

> Example: [Exercise three: Adding context (Compacted with context)](http://localhost:3211/json-ld.org/playground/#startTab=tab-compacted&json-ld=http%3A%2F%2Flocalhost%3A3211%2Fdocument%2Fa003&context=http%3A%2F%2Flocalhost%3A3211%2Fcontext%2Fa003.jsonld)

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

> Example [Exercise two: Adding context (Flattened)](http://localhost:3211/json-ld.org/playground/#startTab=tab-flattened&json-ld=http%3A%2F%2Flocalhost%3A3211%2Fdocument%2Fa002)

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

> Example: [Exercise four: Aliasing](http://localhost:3211/json-ld.org/playground/#startTab=tab-compacted&json-ld=http%3A%2F%2Flocalhost%3A3211%2Fdocument%2Fa004.json&context=http%3A%2F%2Flocalhost%3A3211%2Fcontext%2Fa004.jsonld)

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

> Example: [Exercise five: Aliasing](http://localhost:3211/json-ld.org/playground/#startTab=tab-compacted&json-ld=http%3A%2F%2Flocalhost%3A3211%2Fdocument%2Fa005.json&context=http%3A%2F%2Flocalhost%3A3211%2Fcontext%2Fa005.jsonld)

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

### Datatypes

Notice that we added a @type, datatype for the object; datatypes can also be applied to values:

> Example: [Exercise six: Datatypes](http://localhost:3211/json-ld.org/playground/#startTab=tab-compacted&json-ld=http%3A%2F%2Flocalhost%3A3211%2Fdocument%2Fa006)

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

> Example: [Exercise seven: Datatypes](http://localhost:3211/json-ld.org/playground/#startTab=tab-expanded&json-ld=http%3A%2F%2Flocalhost%3A3211%2Fdocument%2Fa007)
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

> Example: [Exercise eight: Datatypes](http://localhost:3211/json-ld.org/playground/#startTab=tab-expanded&json-ld=http%3A%2F%2Flocalhost%3A3211%2Fdocument%2Fa008)
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

> Example: [Exercise nine: Datatypes **(Fails)**](http://localhost:3211/json-ld.org/playground/#startTab=tab-expanded&json-ld=http%3A%2F%2Flocalhost%3A3211%2Fdocument%2Fa009)

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

### JSON Schema

JSON-Schema.org nd. [JSON Schema](http://json-schema.org/). Accessed 2017-05-19.

Newtonsoft. 2017. [JSON Schema validator] (http://www.jsonschemavalidator.net/). Accessed 2017-05-19.