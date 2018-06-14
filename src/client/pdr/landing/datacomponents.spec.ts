import * as dc from "./datacomponents";

export function main() {
    let datacomps = [
        {
            "@type": ["nrdp:Subcollection"],
            filepath: "a/b"
        },
        {
            "@type": ["nrdp:DataFile"],
            filepath: "a/c"
        },
        {
            "@type": [ "nrdp:DataFile" ],
            filepath: "b/README.md"
        },
        {
            "@type": [ "nrdp:DataFile" ],
            filepath: "b/a"
        },
        {
            "@type": ["nrdp:Subcollection"],
            filepath: "a"
        },
        {
            "@type": [ "nrdp:DataFile" ],
            filepath: "b/c"
        }
    ];
    let nondatacomps = [
        { "@type": ["goob"] },
        { "@type": ["gurn"] }
    ];

    describe("datadcomponents.compare_by_filepath", function() {
        let a = { "@type": ["goob"], filepath: "a" };
        let b = { "@type": ["goob"], filepath: "a/b" };
        
        it("compares alphabetically by the filepath property", function() {
            expect(dc.compare_by_filepath(a, b)).toBe(-1);
            expect(dc.compare_by_filepath(b, a)).toBe(1);
            expect(dc.compare_by_filepath(a, a)).toBe(0);
            expect(dc.compare_by_filepath(b, b)).toBe(0);
        });

        it("can be used to sort an array", function() {
            let l = [ a, b ];
            l.sort(dc.compare_by_filepath);
            expect(l[0].filepath).toBe("a");
            expect(l[1].filepath).toBe("a/b");

            l = [ b, a ];
            l.sort(dc.compare_by_filepath);
            expect(l[0].filepath).toBe("a");
            expect(l[1].filepath).toBe("a/b");
        });
    });

    describe("datacomponents.DataHierarchy", function() {
        let comps = datacomps.slice();
        let dh = new dc.DataHierarchy(comps);

        it("can sort a list of data components", function() {
            expect(dh.data.filepath).toBe("");
            expect(dh.children.length).toBe(2);
            expect(dh.children[0].data.filepath).toBe("a");
            expect(dh.children[1].data.filepath).toBe("b");

            let cdh = dh.children[0]
            expect(cdh.children[0].data.filepath).toBe("a/c");
            expect(cdh.children[1].data.filepath).toBe("a/b");
            expect(cdh.children.length).toBe(2);

            cdh = dh.children[1]
            expect(cdh.children[0].data.filepath).toBe("b/README.md");
            expect(cdh.children[1].data.filepath).toBe("b/a");
            expect(cdh.children[2].data.filepath).toBe("b/c");
            expect(cdh.children.length).toBe(3);
        });

        it("can identifiy subcollections", function() {
            expect(dh.is_subcoll()).toBe(true);
            expect(dh.children[0].is_subcoll()).toBe(true);
            expect(dh.children[0].children[0].is_subcoll()).toBe(false);
            expect(dh.children[0].children[1].is_subcoll()).toBe(true);
            expect(dh.children[1].children[0].is_subcoll()).toBe(false);
        });
    });

    describe("datacomponents.DataComponents", function() {
        let comps = [ ...datacomps.slice(0, 3), nondatacomps[0],
                      ...datacomps.slice(3), nondatacomps[1]     ];
        let rc = new dc.ResComponents(comps);

        it("can wrap a list of components", function() {
            expect(comps.length).toBe(8);
            expect(rc.data.length).toBe(8);
            expect(rc.data[3]["@type"][0]).toBe("goob");
        });

        it("can filter out data components", function() {
            let dcs = rc.dataComponentDescs();
            expect(dcs.length).toBe(6);
            for(let i=0; i < dcs.length; i++) 
                expect(dcs[i].hasOwnProperty('filepath')).toBe(true);
        });

        it("can produce a data hierarchy", function() {
            let dh = rc.dataHierarchy();
            expect(dh.data.filepath).toBe("");
            expect(dh.children.length).toBe(2);
            expect(dh.children[0].data.filepath).toBe("a");
            expect(dh.children[1].data.filepath).toBe("b");
        });
    });

    /*
    describe("datacomponents integration", function() {
        it("can handle a large, deep component list", function() {
            let nerdm = JSON.parse(fs.readFileSync('spec/data/janaf-hier.json', 'utf8'));
            let dcs = new dc.ResComponents(nerdm['components']);
            expect(dcs.data.length > 0).toBe(true);

            let dh = dcs.dataHierarchy();
            expect(dh.children[0].data.filepath).toBe("aluminum");
            expect(dh.children[1].data.filepath).toBe("argon");
            expect(dh.children[1].children[0].data.filepath).toBe("argon/README.txt");
            expect(dh.children[2].data.filepath).toBe("barium");
            expect(dh.children[2].children[0].data.filepath).toBe("barium/srd13_Ba-001.json");
            
        });
    });
    */  
}
