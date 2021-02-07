# This contract is used for testing of contract interaction with Extension
# Deployed on: https://tezos-dev.cryptonomic-infra.tech
# Contract address: KT1SCv11t9p57dwfgAaqUcG7doSJE3T1LNQh
# Deployer Details: {
#  {
#   "mnemonic": [
#     "parade",
#     "era",
#     "number",
#     "wage",
#     "habit",
#     "sauce",
#     "dove",
#     "ordinary",
#     "muffin",
#     "crime",
#     "stumble",
#     "fat",
#     "kingdom",
#     "help",
#     "access"
#   ],
#   "secret": "5bb17c7976b2655fe4a002a15c15d96edcfb2704",
#   "amount": "11872551067",
#   "pkh": "tz1YNd37NWD5PoPYhPFHQWbqUYMLh2AmvVPm",
#   "password": "9fmmCpX0cF",
#   "email": "morqsalo.aicxxpjs@tezos.example.org"
# }
# private: edskRc75MX2TV41jbk13m3P76quxhUKj3ZUQo5tj8772oCUkm9qvQWnNTejDH634SZoJuH2vjJui7Xej2k2QWcfPZvjEhAPV9D
#  public: edpkuZXFLhizuTFpiRATY4vqaRu4xEkNAN627R5VhKXhheUY9fn1ep
# }

import smartpy as sp

class MyContract(sp.Contract):
    # Sets stored string at initialization.
    def __init__(self, param1):
        self.init(contents = param1)

    # Updates stored string when called.
    @sp.entry_point
    def update(self, params):
        self.data.contents = params

# Test
@sp.add_test(name = "TheTest")
def test():
    # We define a test scenario, together with some outputs and checks
    scenario = sp.test_scenario()

    # We first define a contract and add it to the scenario
    c1 = MyContract("Hello")
    scenario += c1

    # And call some of its entry points
    scenario += c1.update("Goodbye")

    # Finally, we check its final storage
    scenario.verify(c1.data.contents == "Goodbye")