import yaml
import re

def define_env(env):
    """
    This is the hook for the variables, macros and filters.
    """

    @env.macro
    def help_wanted(message):
        mid = hash(message) % 10000
        return f"""[^{mid}]
[^{mid}]: {message} Want to contribute? See the [Contribution section](index.md#contributing)"""


    @env.macro
    def component(cname):
        sink_header = "| Sink | Type | Description | \n | -- | -- | -- |"
        source_header = "| Source | Type | Description | \n | -- | -- | -- |"
        with open(f"docs/components/{cname}.yml") as f:
            data = yaml.safe_load(f)
        sinks = [sink_header]
        if data['sinks']:
            for (k, d) in data["sinks"].items():
                if not d:
                    d = {}
                if "name" not in d or d["name"] == "":
                    d["name"] = k
                if "type" not in d or d["type"] == "":
                    d["type"] = f" Type needed"
                if "desc" not in d or d["desc"] == "":
                    d["desc"] = f" Description needed"

                sinks.append(f"| {d['name']} | `{d['type']}` | {d["desc"]} |")


        sources = ["", "", source_header]
        
        if data['sources']:
            for (k, d) in data["sources"].items():
                if not d:
                    d = {}
                if "type" not in d or d["type"] == "":
                    d["type"] = f"Type needed"
                if "desc" not in d or d["desc"] == "":
                    d["desc"] = f"Description needed"

                sources.append(f"| {k} | `{d['type']}` | {d["desc"]} |")

        return "\n".join(sinks) + "\n".join(sources)

    @env.macro
    def patterns():
        
        with open(f"docs/patterns/types.yml") as f:
            types = yaml.safe_load(f)
        typePage = {}
        type_header = "\n\n| Attribute | Type | Description | \n | -- | -- | -- |"
        for (type,type_data) in types.items():
            typePage[type] = [type_header]
            for (k,d) in type_data.items():
                if not d:
                    d = {}
                if "usage" not in d or d["usage"] == "":
                    d["usage"] = f"`{k}`"
                if "type" not in d or d["type"] == "":
                    d["type"] = f"Type needed"
                if "description" not in d or d["description"] == "":
                    d["description"] = f"Description needed"
                
                # Process newlines and code sections in the description
                # Additionally escapes backticks (`) in code segments
                # Currently only works for ```desmoscl code ``` formatted code. Regex can fix that
                desc = d["description"]
                matches = re.findall(r"```desmoscl(?:(?!```)[\s\S])*```", desc)
                for m in matches:
                    desc = desc.replace(m, "```desmoscl"+m[11:-3].replace("`", "\\`")+"```")
                desc = desc.replace("```desmoscl", "<pre class=\"desmoscl\"><code>")
                desc = desc.replace("```", "</code></pre>")
                desc = desc.rstrip().replace("\n", "<br/>")
                d["description"] = desc
                typePage[type].append(f"| {d['usage'].rstrip()} | `{d['type'].rstrip()}` | {d["description"]} |")
            typePage[type] += ["", ""]


        with open(f"docs/patterns/patterns.yml") as f:
            patterns = yaml.safe_load(f)
        
        pattern_data = []
        for (k,d) in patterns.items():
            p_header = f"### pattern.{k}"
            if not d:
                pattern_data.append(p_header)
                pattern_data.append("Description Needed")
                continue
            usage = "" if "usage" not in d else d["usage"]
            desc = "" if "description" not in d else d["description"]
            
            pattern_type = []
            if "patternType" not in d:
                pattern_type = ["Type information needed"]
            elif d["patternType"] not in typePage:
                pattern_type = [f"Type information needed for type {d['patternType']}"]
            else:
                pattern_type.append(f"`{d["patternType"]}`")
                pattern_type += typePage[d["patternType"]]

            match_type = []
            if "matchType" not in d:
                match_type = ["Match type information needed"]
            elif d["matchType"] not in typePage:
                match_type = [f"Match type information needed for type {d['matchType']}"]
            else:
                match_type.append(f"`{d["matchType"]}`")
                match_type += typePage[d["matchType"]]

            # Set up section for pattern
            pattern_data.append(p_header)
            pattern_data.append(usage)
            pattern_data.append(desc)

            pattern_data.append("#### Pattern Attributes")
            pattern_data += pattern_type

            pattern_data.append("#### Match Attributes")
            pattern_data += match_type
        
        return "\n".join(pattern_data)